class VendingMachine {
    constructor() {
        this.currentState = 'Idle';
        this.stock = { Coke: 3, Pepsi: 5, Water: 2 };
        this.selectedItem = null;
        this.transition('Idle');
    }

    transition(newState, item = null) {
        this.currentState = newState;
        this.selectedItem = item;

        switch (newState) {
            case 'Idle':
                updateDisplay("Select an item");
                disableButtons(false);
                setPaymentButtonState(false);
                break;
            case 'OutOfStock':
                updateDisplay(`${this.selectedItem} is out of stock!`);
                disableButtons(false);
                setPaymentButtonState(false);
                break;
            case 'AwaitingPayment':
                updateDisplay(`Please pay for ${this.selectedItem}`);
                disableButtons(true);
                setPaymentButtonState(true);
                break;
            case 'Dispensing':
                updateDisplay(`Dispensing ${this.selectedItem}`);
                this.dispenseItem(this.selectedItem);
                break;
        }
    }

    selectItem(item) {
        if (this.currentState !== 'Idle' && item == this.selectedItem) {
            alert("Please wait, the machine is busy.");
            return;
        }

        if (this.stock[item] <= 0) {
            this.transition('OutOfStock', item);
            return;
        }

        this.transition('AwaitingPayment', item);
    }

    confirmPayment() {
        if (this.currentState === 'AwaitingPayment') {
            this.transition('Dispensing', this.selectedItem);
        }
    }

    dispenseItem(item) {
        disableButtons(true);
        setPaymentButtonState(false);
        dropProduct(item);
        const itemSlot = document.getElementById(`${item.toLowerCase()}Slot`);
        itemSlot.classList.add('dispensing');

        setTimeout(() => {
            updateDisplay("Please collect your item");
            itemSlot.classList.remove('dispensing');
            this.stock[item]--;
            this.transition('Idle');
        }, 2000);
    }

    restockItems() {
        for (let item in this.stock) {
            this.stock[item] = 5;
        }
        this.transition('Idle');
    }
}

function selectItem(item) {
    vendingMachine.selectItem(item);
}

function confirmPayment() {
    vendingMachine.confirmPayment();
}

function restockItems() {
    vendingMachine.restockItems();
}

function dropProduct(item) {
    const fallingProduct = document.getElementById("fallingProduct");
    switch (item) {
        case 'Coke':
            fallingProduct.style.left = '15%';
            break;
        case 'Pepsi':
            fallingProduct.style.left = '50%';
            break;
        case 'Water':
            fallingProduct.style.left = '85%';
            break;
    }
    fallingProduct.style.animation = "dropAnimation 2s forwards";
    setTimeout(() => {
        fallingProduct.style.animation = "";
    }, 2000);
}

function updateDisplay(message) {
    document.getElementById("vendingStatus").innerText = message;
}

function disableButtons(disabled) {
    const buttons = document.querySelectorAll("#controls button");
    buttons.forEach(button => button.disabled = disabled);
}

function setPaymentButtonState(enabled) {
    const paymentButton = document.getElementById("confirmPaymentButton");
    paymentButton.style.display = enabled ? "block" : "none";
    paymentButton.disabled = !enabled
}

const vendingMachine = new VendingMachine();
