-- Test helpers: qa.deny expects an error, qa.eq expects a value. Results land in qa.results.
create schema qa;
create table qa.results (n serial primary key, name text, pass boolean, detail text);
grant usage on schema qa to anon, authenticated;
grant select, insert on qa.results to anon, authenticated;
grant usage, select on sequence qa.results_n_seq to anon, authenticated;

create function qa.deny(name text, q text) returns void language plpgsql as $$
begin
  begin
    execute q;
  exception when others then
    insert into qa.results (name, pass, detail) values (name, true, 'blocked: ' || sqlstate || ' ' || sqlerrm);
    return;
  end;
  insert into qa.results (name, pass, detail) values (name, false, 'NOT blocked');
end $$;

create function qa.eq(name text, q text, expected text) returns void language plpgsql as $$
declare got text;
begin
  begin
    execute q into got;
  exception when others then
    insert into qa.results (name, pass, detail) values (name, false, 'error: ' || sqlstate || ' ' || sqlerrm);
    return;
  end;
  insert into qa.results (name, pass, detail)
  values (name, got is not distinct from expected,
          'got ' || coalesce(got, 'NULL') || ', expected ' || coalesce(expected, 'NULL'));
end $$;
grant execute on all functions in schema qa to anon, authenticated;

