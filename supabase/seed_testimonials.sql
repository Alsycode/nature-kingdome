-- Run this in your Supabase SQL editor AFTER running schema_testimonials.sql
-- Seeds the 5 original testimonials in display order (newest first = first in carousel)

insert into testimonials (quote, name, role, image_url, active, created_at) values
(
  'The journey there felt like part of the experience.',
  'Arjun M.',
  'Solo Traveler',
  'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=80&w=900',
  true,
  now() - interval '4 days'
),
(
  'Breakfast among the trees felt unreal.',
  'Meera & Karan',
  'Photographers',
  'https://images.unsplash.com/photo-1543007630-9710e4a00a20?auto=format&fit=crop&q=80&w=900',
  true,
  now() - interval '3 days'
),
(
  'The campfire conversations stayed with us long after we left.',
  'Rohan V.',
  'Entrepreneur',
  'https://images.unsplash.com/photo-1526498460520-4c246339dccb?auto=format&fit=crop&q=80&w=900',
  true,
  now() - interval '2 days'
),
(
  'The wilderness here is raw, honest and beautiful.',
  'Ananya P.',
  'Solo Traveler',
  'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=900',
  true,
  now() - interval '1 day'
),
(
  'It''s not just a stay, it''s a feeling you carry home.',
  'Dev & Simran',
  'Couple',
  'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&q=80&w=900',
  true,
  now()
);
