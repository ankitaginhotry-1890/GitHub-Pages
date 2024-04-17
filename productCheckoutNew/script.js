document.addEventListener('DOMContentLoaded', function() {
    // Your JavaScript code here
    const productBInput = document.getElementById('productB');
    const productAInput = document.getElementById('productA');
    const productCInput = document.getElementById('productC');
    const placeBtn = document.getElementById('placeOrderBtn');

    productBInput.addEventListener('input', function() {
        const quantityB = parseInt(productBInput.value);

        // Enable/disable Product A based on Product B quantity
        if (quantityB >= 10) {
            productAInput.disabled = false;
        } else {
            productAInput.disabled = true;
            productAInput.value = '';
        }

        // Enable/disable Product C based on Product B quantity
        if (quantityB > 0) {
            productCInput.disabled = false;
        } else {
            productCInput.disabled = true;
            productCInput.value = '';
        }
    });

    //validate the products quantity before send the request to the backend.
    function validateProductInputs(productData){
        let ProductA = productData.productAQuantity;
        let ProductB = productData.productBQuantity;
        let ProductC = productData.productCQuantity;

        //you can buy the product c if you want after passing the first if case
        if(ProductB <= 0){
            return {
                "success": false,
                "message": "Oops! To buy Product A and C, first add Product B to your cart"
            };
        } else if(ProductB<10 && ProductA>0){
            return {
                "success": false,
                "message":  "Wait! You'll need 10 or more of Product B in your cart to unlock Product A"
            };
        }

        return {
            "success": true,
            "message": "card validated successfully"
        }
    }

    placeBtn.addEventListener('click', function(){

        const productBQuantity = productBInput.value;
        const productAQuantity = productAInput.value;
        const productCQuantity = productCInput.value;

        const formData = {
            'productBQuantity': productBQuantity,
            'productAQuantity': productAQuantity,
            'productCQuantity': productCQuantity,
        };

        console.log(formData);

        let validationResponse = validateProductInputs(formData);
        if(!validationResponse.success) {
            alert(validationResponse.message);
            displayOrderDetails({
                'productBQuantity': 0,
                'productAQuantity': 0,
                'productCQuantity': 0,
            });
        } else {
            displayOrderDetails(formData);
            alert("Order Placed Successful");
        }
      
    });


    /**
     * Displays the order details in the DOM.
     * @param {object} data - The order details.
     * @param {number} data.productAQuantity - The quantity of product A.
     * @param {number} data.productBQuantity - The quantity of product B.
     * @param {number} data.productCQuantity - The quantity of product C.
     */
    function displayOrderDetails(data) {
        const productsList = document.getElementById('productsList');
        console.log(productsList);
        productsList.innerHTML = '';

        // Display products
        if (data.productAQuantity > 0) {
            productsList.innerHTML += `<h2 style="color: green">Product A: ${data.productAQuantity}</h2>`;
        }
        if (data.productBQuantity > 0) {
            productsList.innerHTML += `<h2 style="color: green">Product B: ${data.productBQuantity}</h2>`;
        }
        if (data.productCQuantity > 0) {
            productsList.innerHTML += `<h2 style="color: green">Product C: ${data.productCQuantity}</h2>`;
        }

        // Show order details section
        document.getElementById('checkoutDetails').style.display = 'block';
    }



    //extra functionality [if user want to make a default bare minimum parches then he can use the fill default button]
    const toggleSwitch = document.getElementById('toggleSwitch');

    console.log(toggleSwitch);

    toggleSwitch.addEventListener('change', function() {
        const switchChecked = toggleSwitch.checked;
        if (switchChecked) {
            // Set default values for Product B, A, and C when the switch is checked
            document.getElementById('productB').value = 10;
            document.getElementById('productA').value = 1;
            document.getElementById('productC').value = 1;
        } else {
            // Set different default values for Product B, A, and C when the switch is unchecked
            document.getElementById('productB').value = '';
            document.getElementById('productA').value = '';
            document.getElementById('productC').value = '';
        }
    });

});
