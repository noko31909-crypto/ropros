-- Published catalog entries for the three launch guides (safe to re-run).
insert into public.projects (slug, title, platform, difficulty, components_required, xp_reward, is_published) values
  ('obstacle-avoiding-robot', 'Obstacle Avoiding Robot', 'arduino', 'intermediate',
   array['Arduino Uno','HC-SR04','SG90 Servo','L298N','DC Motor'], 250, true),
  ('line-follower', 'Precision Line Follower', 'arduino', 'beginner',
   array['Arduino Nano','TCRT5000 IR Array','L298N','DC Motor'], 200, true),
  ('iot-plant-care', 'IoT Plant Care Station', 'esp32', 'beginner',
   array['ESP32 DevKit','Capacitive Soil Sensor','DHT22','SSD1306 OLED','Relay Module','Water Pump'], 180, true)
on conflict (slug) do update set
  title = excluded.title, platform = excluded.platform, difficulty = excluded.difficulty,
  components_required = excluded.components_required, xp_reward = excluded.xp_reward, is_published = true;
