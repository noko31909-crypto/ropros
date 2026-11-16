-- ropros new guides: the three Raspberry Pi 5 guides as published catalogue rows
-- Paste the whole file into the Supabase SQL editor and run it. Needed for progress, XP and build logs on these guides.
-- Safe to run again: existing rows are updated. supabase/seed-guides.sql holds every guide.

insert into public.projects (slug, title, platform, difficulty, components_required, xp_reward, is_published) values
  ('pi5-bme280-weather-logger', 'Raspberry Pi 5 Weather Logger', 'raspberry_pi', 'beginner', array['Raspberry Pi 5','BME280 sensor (4-pin, onboard 3.3 V regulator)'], 140, true),
  ('pi5-parking-sensor', 'Raspberry Pi 5 Parking Sensor', 'raspberry_pi', 'beginner', array['Raspberry Pi 5','HC-SR04 ultrasonic sensor','Resistor (¼ W)','LED 5 mm (needs series resistor)'], 140, true),
  ('pi5-reaction-duel', 'Two-Player Reaction Duel on Raspberry Pi 5', 'raspberry_pi', 'beginner', array['Raspberry Pi 5','LED 5 mm (needs series resistor)','Resistor (¼ W)','Tactile push button 6×6 mm'], 120, true)
on conflict (slug) do update set
  title = excluded.title, platform = excluded.platform, difficulty = excluded.difficulty,
  components_required = excluded.components_required, xp_reward = excluded.xp_reward, is_published = true;
