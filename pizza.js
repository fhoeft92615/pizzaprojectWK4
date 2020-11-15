$(document).ready(
    function () {
        //initial load
        $("#information").hide();
        $("#order").hide();

        //assign event handler
        $("#informationBtn").click(showInformation);
        $("#homeBtn").click(showHome);
        $("#orderBtn").click(showOrder);

        //functions!
        function showInformation(event){
            $("#home").hide();
            $("#order").hide();
            $("#information").show();
            //fix adding too many items bug
            $("#customerGoodness").empty();
        }

        function mapCustomerInfo(item, index)
        {
            switch (item.name){
                case "name":
                    $("#orderName").text(item.value);
                    break;
                case "streetAddress":
                    $("#orderAddress").text(item.value);
                    break;
                case "apartmentNumber":
                    $("#orderApt").text(item.value);
                    break;
                case "city":
                    $("#orderCity").text(item.value);
                    break;
                case "state":
                    $("#orderState").text(item.value);
                    break;
                case "zipcode":
                    $("#orderZip").text(item.value);
                    break;
                case "telephoneNumber":
                    $("#orderPhone").text(item.value);
                    break;
            }

        }

        function showOrder(event){
            $("#home").hide();
            $("#information").hide();
            $("#order").show();

            //calculate order information

            //get info from information form
            var infoForm = $("#location").serializeArray();

            //store information on order information page
            infoForm.forEach(mapCustomerInfo);

            //get information from home page
            var homeForm = $("#pizzaPizza").serializeArray();

            //get subtotal; value of size + (#of Meats * 1.50) + (#of other toppings * 1)
            var valueOfSize = 0, valueOfMeats = 0, valueOfOthers = 0;
            homeForm.forEach(function (item, index){
                if (item.name === "size"){
                    switch (item.value){
                        case "Small":
                            valueOfSize = 7.00;
                            break;
                        case "Medium":
                            valueOfSize = 9.00;
                            break;
                        case "Large":
                            valueOfSize = 12.00;
                            break;
                    }
                }
                if (item.name === "meats"){
                    valueOfMeats = valueOfMeats + 1.50;
                }
                if (item.name === "veggies"){
                    valueOfOthers = valueOfOthers + 1.00;
                }
            });

            var subTotal = valueOfSize + valueOfMeats + valueOfOthers;
            $("#subTotal").text("Subtotal: $" + subTotal.toFixed(2));

            //multiply subtotal by .051 to get sales tax value
            var salesTax = subTotal * .051;
            $("#salesTax").text("Sales Tax (5.1%): $" + salesTax.toFixed(2));

            //add subtotal to sales tax value + 2.00 for delivery for total
            var total = subTotal + salesTax + 2.00;
            $("#total").text("Your total is: $" + total.toFixed(2));

            //display customer's order
            var customerSelections = "";
            homeForm.forEach(function (item, index){
                $("#customerGoodness").append('<li>' + item.value + '</li>');
            });

        }

        function showHome(event){
            $("#information").hide();
            $("#order").hide();
            $("#home").show();
            //fix adding too many items bug
            $("#customerGoodness").empty();
        }


    });

