const ShoppingCart = require('../src/ShoppingCart');

describe('ShoppingCart', () => {
  let cart;

  beforeEach(() => {
    // Arrange (shared): setiap test mulai dengan keranjang kosong
    cart = new ShoppingCart();
  });

  // ===== addItem =====
  describe('addItem', () => {
    test('should add item when valid item given', () => {
      // Arrange
      const item = { name: 'Book', price: 50000 };

      // Act
      cart.addItem(item);

      // Assert
      expect(cart.items).toHaveLength(1);
      expect(cart.items[0].name).toBe('Book');
    });

    test('should increment quantity when same item added twice', () => {
      // Arrange
      const item = { name: 'Book', price: 50000 };

      // Act
      cart.addItem(item);
      cart.addItem(item);

      // Assert
      expect(cart.items).toHaveLength(1);
      expect(cart.items[0].quantity).toBe(2);
    });

    test('should throw error when item has no name', () => {
      // Arrange
      const invalidItem = { price: 1000 };

      // Act
      const act = () => cart.addItem(invalidItem);

      // Assert
      expect(act).toThrow('Invalid item');
    });

    test('should throw error when price is negative', () => {
      // Arrange
      const invalidItem = { name: 'X', price: -1 };

      // Act
      const act = () => cart.addItem(invalidItem);

      // Assert
      expect(act).toThrow('Price cannot be negative');
    });
  });

  // ===== removeItem =====
  describe('removeItem', () => {
    test('should remove item when existing item name given', () => {
      // Arrange
      cart.addItem({ name: 'Book', price: 50000 });

      // Act
      cart.removeItem('Book');

      // Assert
      expect(cart.items).toHaveLength(0);
    });

    test('should throw error when removing non-existent item', () => {
      // Arrange
      const unknownName = 'Ghost';

      // Act
      const act = () => cart.removeItem(unknownName);

      // Assert
      expect(act).toThrow('Item not found');
    });
  });

  // ===== calculateSubtotal =====
  describe('calculateSubtotal', () => {
    test('should return 0 when cart is empty', () => {
      // Arrange (cart kosong dari beforeEach)

      // Act
      const subtotal = cart.calculateSubtotal();

      // Assert
      expect(subtotal).toBe(0);
    });

    test('should sum price times quantity when multiple items exist', () => {
      // Arrange
      cart.addItem({ name: 'Book', price: 50000, quantity: 2 });
      cart.addItem({ name: 'Pen', price: 10000 });

      // Act
      const subtotal = cart.calculateSubtotal();

      // Assert
      expect(subtotal).toBe(110000);
    });
  });

  // ===== calculateTotal =====
  describe('calculateTotal', () => {
    test('should return subtotal when no discount and no tax', () => {
      // Arrange
      cart.addItem({ name: 'Book', price: 100000 });

      // Act
      const total = cart.calculateTotal();

      // Assert
      expect(total).toBe(100000);
    });

    test('should apply discount correctly when discount rate given', () => {
      // Arrange
      cart.addItem({ name: 'Book', price: 100000 });

      // Act
      const total = cart.calculateTotal(0.1);

      // Assert
      expect(total).toBe(90000);
    });

    test('should apply discount then tax when both rates given', () => {
      // Arrange
      cart.addItem({ name: 'Book', price: 100000 });

      // Act
      // 100000 * 0.9 = 90000, lalu * 1.11 = 99900
      const total = cart.calculateTotal(0.1, 0.11);

      // Assert
      expect(total).toBe(99900);
    });

    test('should throw error when discount rate is out of range', () => {
      // Arrange
      const invalidDiscount = 1.5;

      // Act
      const act = () => cart.calculateTotal(invalidDiscount);

      // Assert
      expect(act).toThrow('Invalid discount rate');
    });

    test('should throw error when tax rate is out of range', () => {
      // Arrange
      const invalidTax = -0.1;

      // Act
      const act = () => cart.calculateTotal(0, invalidTax);

      // Assert
      expect(act).toThrow('Invalid tax rate');
    });
  });

  // ===== getItemCount =====
  describe('getItemCount', () => {
    test('should return 0 when cart is empty', () => {
      // Arrange (cart kosong dari beforeEach)

      // Act
      const count = cart.getItemCount();

      // Assert
      expect(count).toBe(0);
    });

    test('should sum all quantities when multiple items exist', () => {
      // Arrange
      cart.addItem({ name: 'A', price: 1, quantity: 3 });
      cart.addItem({ name: 'B', price: 1, quantity: 2 });

      // Act
      const count = cart.getItemCount();

      // Assert
      expect(count).toBe(5);
    });
  });

  // ===== clear =====
  describe('clear', () => {
    test('should empty the cart when clear is called', () => {
      // Arrange
      cart.addItem({ name: 'A', price: 1 });

      // Act
      cart.clear();

      // Assert
      expect(cart.items).toHaveLength(0);
    });
  });
});
