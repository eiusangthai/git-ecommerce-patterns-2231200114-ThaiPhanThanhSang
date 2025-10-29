import { InventoryService } from '../../services/InventoryService.js';
import { PaymentService } from '../../services/PaymentService.js';
import { ShippingService } from '../../services/ShippingService.js';

class CheckoutFacade {
    constructor() {
        this.inventoryService = new InventoryService();
        this.paymentService = new PaymentService();
        this.shippingService = new ShippingService();
    }

    placeOrder(orderDetails) {
        // TODO: Implement the Facade method.
        // This method should orchestrate the calls to the subsystem services
        // in the correct order to simplify the checkout process.
        // 1. Check if all products are in stock using `inventoryService.checkStock()`.
        // 2. If they are, process the payment using `paymentService.processPayment()`.
        // 3. If payment is successful, arrange shipping using `shippingService.arrangeShipping()`.
        // 4. Log the result of each step. If a step fails, log it and stop.
        console.log("Starting checkout process...");
        const inStock = this.inventoryService.checkStock(orderDetails.productIds);
        if (!inStock) {
            console.log("Some items are out of stock. Order cannot proceed.");
            return;
        }
        console.log("All items are in stock");

        const paymentSuccess = this.paymentService.processPayment(orderDetails.userId, orderDetails.amount);
        if (!paymentSuccess) {
            console.log("Payment failed. Order cannot proceed.");
            return;
        }
        console.log("Payment successful.");

        const shippingInfo = this.shippingService.arrangeShipping(orderDetails.userId, orderDetails.shippingInfo);
        console.log(`Shipping arranged. Tracking ID: ${shippingInfo.trackingId}`);

        console.log("Order placed successfully!");
    }
}

export { CheckoutFacade };
