# Tech E-Commerce

This front-end application built with Next.js 13 and was seamlessly integrated with the Django REST Framework API. This synergy creates an easy-to-use graphical interface (GUI) that enhances the user experience and allows the user to fully explore all of the website's features.

## Repositories

-   [Front-End Repository (Current)](https://github.com/GoTierGod/tech-ecommerce)
-   [Back-End Repository](https://github.com/GoTierGod/tech-ecommerce-api)

## Key Features

### Authentication and Authorization

-   **Secure JWT Authentication:** Seamlessly integrates JWT (JSON Web Token) authentication provided by the API, enhancing the security of user logins and access to protected resources.
-   **Robust Authorization:** Ensures that only authenticated users can access privileged sections of the application. Unauthenticated visitors are restricted from viewing pages that require login, guaranteeing data privacy and security.

### Data Validation and Processing

-   **Client-side Validation:** Implements client-side form validation using the `Formik` and `Yup` packages, ensuring data integrity and user-friendly input validation.
-   **Server-side Data Handling:** Utilizes Next.js route handlers to perform data validation and processing, guaranteeing that data is accurately transmitted to the API.

### High-Quality User Experience

-   **Optimized Website:** Prioritizes website optimization, emphasizing semantic markup, accessibility, and interactivity to provide a top-tier user experience for all visitors.
-   **Accessibility Focus:** Ensures accessibility features are in place, making the website usable by individuals with diverse needs and abilities.

### Caching for Speed

-   **Built-in Caching:** Leverages Next.js's built-in caching system, coupled with API caching, to minimize the number of requests and accelerate data retrieval. This results in lightning-fast navigation across the website.

### Error Handling

-   **Intelligent Error Management:** The application uses the Next.js `error page` in combination with a custom `ErrorDisplay.tsx` component to handle application errors. The first is for unexpected errors and `HTTP 429` responses couse of throttled requests, and the second is for form submission errors and other common errors that can occur.

### Public Resources and Search

-   **Browse and Search:** Allows unauthenticated users to explore the website's public resources and search for available products, while adhering to the API's anonymous rate limit.

### Account Management

-   **User-Friendly Account Management:** Provides an intuitive graphical user interface (GUI) for users to create and manage their account information. Users are adhered to the API user rate limit.

### Shopping Cart

-   **Convenient Shopping Cart:** Authenticated users can maintain a shopping cart with a maximum limit of 10 items.
-   **Easy Access:** Offers multiple links to the user's shopping cart, accessible through the dropdown menu, navigation bar, and user profile.

### Favorites

-   **Personalized Favorites:** Authenticated users can curate a list of up to 25 favorite items.
-   **Quick Access:** Provides links to the user's favorites in the dropdown menu, navigation bar, and user profile.

### Purchases

-   **Efficient Purchases:** Authenticated users can efficiently purchase products, with a maximum of 3 active orders and the ability to buy up to 10 products per order.
-   **Order Management:** Allows users to report issues, review their purchase history, and access purchase details through the history page.

### Product Reviews

-   **Transparent Product Reviews:** Enables users to view product reviews directly from the product page.
-   **User Engagement:** Facilitates user-generated reviews, with the ability to leave reviews after order delivery, and provides options to like, dislike, or report other users' reviews.

### Coupon Integration

-   **Discounts with Coupons:** Authenticated users can enhance their shopping experience by applying coupons to receive discounts on their purchases.

## License

This project is licensed under the [MIT License](https://github.com/GoTierGod/react-calculator/blob/main/LICENSE.md).
