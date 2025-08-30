-- Données d'exemple pour tester l'application

-- Utilisateur de test
INSERT INTO users (id, name, email, password_hash, phone) VALUES 
('550e8400-e29b-41d4-a716-446655440000', 'Admin Système', 'admin@stockapp.com', '$2b$10$example_hash', '+33123456789')
ON CONFLICT (email) DO NOTHING;

-- Produits d'exemple
INSERT INTO products (name, description, buy_price, stock_qty, min_stock_alert, category) VALUES 
('Ordinateur Portable Dell', 'Dell Inspiron 15 3000', 450.00, 25, 5, 'Informatique'),
('Souris Logitech', 'Souris optique sans fil', 15.00, 150, 20, 'Accessoires'),
('Clavier Mécanique', 'Clavier gaming RGB', 85.00, 45, 10, 'Accessoires'),
('Écran 24 pouces', 'Moniteur Full HD IPS', 180.00, 30, 5, 'Informatique'),
('Casque Audio', 'Casque Bluetooth premium', 120.00, 60, 15, 'Audio'),
('Smartphone Samsung', 'Galaxy A54 128GB', 320.00, 40, 8, 'Téléphonie'),
('Tablette iPad', 'iPad Air 64GB', 480.00, 20, 5, 'Informatique'),
('Chargeur USB-C', 'Chargeur rapide 65W', 25.00, 200, 30, 'Accessoires'),
('Disque SSD', 'SSD 1TB NVMe', 95.00, 75, 15, 'Stockage'),
('Webcam HD', 'Caméra 1080p avec micro', 55.00, 35, 10, 'Accessoires')
ON CONFLICT DO NOTHING;

-- Vente d'exemple
INSERT INTO sales (id, client_name, client_phone, user_id, total_buy, total_sell, profit) VALUES 
('660e8400-e29b-41d4-a716-446655440000', 'Jean Dupont', '+33987654321', '550e8400-e29b-41d4-a716-446655440000', 465.00, 650.00, 185.00)
ON CONFLICT DO NOTHING;

-- Articles de la vente d'exemple
INSERT INTO sale_items (sale_id, product_id, quantity, unit_buy_price, unit_sell_price, total_buy, total_sell) 
SELECT 
    '660e8400-e29b-41d4-a716-446655440000',
    p.id,
    1,
    p.buy_price,
    p.buy_price * 1.4,
    p.buy_price,
    p.buy_price * 1.4
FROM products p 
WHERE p.name = 'Ordinateur Portable Dell'
ON CONFLICT DO NOTHING;

-- Mouvements de stock d'exemple
INSERT INTO stock_movements (product_id, movement_type, quantity, reason, user_id)
SELECT 
    p.id,
    'BUY',
    p.stock_qty,
    'Stock initial',
    '550e8400-e29b-41d4-a716-446655440000'
FROM products p
ON CONFLICT DO NOTHING;
