# Bamazon-Project
Working with sql and node <br> <br>



## ver 1.0.0 

The Bamazon app is an interactive inferface for Bamazon(fake) to handle its day to day businesses.


#### <strong>The customer view (bamazonCustomer.js)</strong>

![welcoming log](./screenshots/bamazonCustomer_start.png) <br>
Customer are welcome with a list of available products <br>

![choices](./screenshots/bamazonCustomer_options.png) <br>
Customer can choose from a list of product Ids to buy the product they want <br>

![Buy product](./screenshots/bamazonCustomer_quantity.png) <br>
Once select the item they wish to purchase (in this case item 4, Baseball Bat) the customer is prompted with the question <br>

![success](./screenshots/bamazonCustomer_successful.png) <br>
If it's successful customer will be congradulated on their purchase and ask if they want to buy something else <br>
> Y: The app will bring customer back to welcome page with changes reflecting the last purchase <br>
> N: The app will prompt customer with good bye and terminate the process <br>

![fail](./screenshots/bamazonCustomer_fail.png) <br>
If the customer attempts to buy more than the products available in store, the app will prompt the user with fail message and ask if they want to buy something else <br>
> Y: The app will bring customer back to welcome page with changes reflecting the last purchase <br>
> N: The app will prompt customer with good bye and terminate the process <br>

![goodbye](./screenshots/bamazonCustomer_seeyounexttime.png) <br> <br>



#### The manager view (bamazonManager.js)

![welcoming log](./screenshots/bamazonManager_start.png) <br>
When entering the app manager are greeted with a list of utilities available for assisting store management <br>

![view product](./screenshots/bamazonManager_viewproducts.png) <br>
Choosing view products the manager will get a list of items available in store <br>

![low inventory](./screenshots/bamazonManager_productlowinventoryNull.png) 
![low inventory - 2](./screenshots/bamazonManager_productlowinventory.png) <br>
Alternatively the manager can also ask the app to show him a list of products that are running low <br>
> As shown in first image all products are above the low-inventory threshold so nothing but the table head will show <br>
> However, if any items in store drops below the threshold the list will be shown in the list <br>

![replenish stock](./screenshots/bamazonManager_replenish.png) <br>
![replenish stock - 2](./screenshots/bamazonManager_replenish2.png) <br>
The manager can use the "replenish inventory" option to stock up the store. Once choosed the item (by the id) the manager is then prompted with the amount of purchase. <br>

![add new product](./screenshots/bamazonManager_addproduct.png) <br>
The manager can also add new product to the store available list. The app will then prompt with a series of question asking for the name of the product, department, price and initial inventory count (Unfortunately I set the column byte length a little too low to handle number larger than 9999) <br>



#### The supervisor view (bamazonManager.js)
