# PrestaShop 1.7 Concepts & Architecture

*Comprehensive guide to PrestaShop 1.7 core concepts, data models, and architecture.*

## Table of Contents

- [Architecture Overview](#architecture-overview)
- [Core Entities](#core-entities)
  - [Products](#products)
  - [Categories](#categories)
  - [Customers](#customers)
  - [Orders](#orders)
  - [Stock Management](#stock-management)
  - [Modules](#modules)
  - [Configurations](#configurations)
- [Data Models and Relationships](#data-models-and-relationships)
- [REST API Fundamentals](#rest-api-fundamentals)
- [Best Practices](#best-practices)

## Architecture Overview

PrestaShop 1.7 is an open-source e-commerce platform built with a modern, modular architecture designed for extensibility and customization. The platform provides comprehensive tools for building and managing online stores with:

- **Modular Design**: Built on a plugin/module system allowing merchants to extend functionality without modifying core code
- **Multi-shop Support**: Single PrestaShop installation can manage multiple shops with different configurations
- **Language and Currency Support**: Native multi-language and multi-currency capabilities through the configuration system
- **RESTful Webservice API**: Complete programmatic access to all core resources via REST API with granular permission control
- **Object-Oriented Structure**: Modern PHP architecture using object models for all core entities

The core system organizes around several fundamental concepts:
- **Resources**: Core entities (Products, Categories, Customers, Orders, etc.) accessible via the API
- **Associations**: Relationships between resources (Products linked to Categories, Combinations linked to Products, etc.)
- **Multi-language Support**: Text fields support multiple language variants indexed by language ID
- **Shop-aware Models**: Most entities support multi-shop scenarios with default shop assignments

## Core Entities

### Products

Products are the central commercial entity in PrestaShop. Each product has extensive metadata and can support variants through combinations.

#### Product Fields
Key product attributes in the webservice schema:

- **id**: Unique product identifier
- **id_manufacturer**: Reference to product manufacturer
- **id_supplier**: Reference to primary supplier
- **id_category_default**: Default category for display and navigation
- **reference**: Unique alphanumeric product code
- **supplier_reference**: Reference code used by supplier
- **ean13**: European Article Number (13-digit barcode)
- **isbn**: ISBN for books and publications
- **upc**: Universal Product Code
- **mpn**: Manufacturer Part Number
- **price**: Base product price
- **wholesale_price**: Cost price for wholesaling
- **ecotax**: Ecological tax amount
- **weight**: Product weight for shipping calculations
- **width, height, depth**: Dimensional measurements
- **quantity**: Current stock quantity
- **minimal_quantity**: Minimum purchase quantity
- **low_stock_threshold**: Alert threshold for low inventory
- **low_stock_alert**: Boolean flag to enable alerts
- **available_date**: Date when product becomes available
- **on_sale**: Boolean flag indicating promotional status
- **online_only**: Boolean restricting sale to online only
- **active**: Boolean enabling/disabling the product
- **type**: Product type classification
- **condition**: Product condition (new/refurbished/used)
- **visibility**: Search and catalog visibility setting
- **show_price**: Boolean controlling price visibility
- **indexed**: Boolean for search engine indexing
- **advanced_stock_management**: Boolean enabling advanced stock features
- **date_add**: Product creation timestamp
- **date_upd**: Last modification timestamp

#### Product Multi-language Fields

Certain product fields support multiple languages with language ID indexing:
- **name**: Product display name
- **description**: Full product description
- **description_short**: Brief product summary
- **link_rewrite**: URL-friendly slug for SEO
- **meta_title**: HTML meta title tag
- **meta_description**: HTML meta description
- **meta_keywords**: HTML meta keywords
- **delivery_in_stock**: Message when in stock
- **delivery_out_stock**: Message when out of stock
- **available_now**: Text label for availability
- **available_later**: Text label for future availability

#### Product Associations

Products can be associated with related entities:
- **categories**: Categories the product belongs to
- **images**: Product images for gallery display
- **combinations**: Product variants/options
- **product_option_values**: Option values assigned to the product
- **product_features**: Features/attributes assigned to the product
- **tags**: Searchable tags for organization

#### Product REST API Endpoints

```
GET    /api/products                 # List all products
GET    /api/products/{id}            # Get specific product
POST   /api/products                 # Create new product
PUT    /api/products/{id}            # Update product
DELETE /api/products/{id}            # Delete product
```

### Categories

Categories organize products into a hierarchical tree structure for navigation and organization.

#### Category Fields

- **id**: Unique category identifier
- **id_parent**: Parent category ID for hierarchy (0 for root)
- **id_shop_default**: Default shop assignment
- **is_root_category**: Boolean flag for root categories
- **level_depth**: Nesting level in hierarchy
- **position**: Display order among siblings
- **active**: Boolean enabling/disabling category
- **date_add**: Creation timestamp
- **date_upd**: Last modification timestamp

#### Category Multi-language Fields

- **name**: Category display name
- **link_rewrite**: URL-friendly slug
- **description**: Category description text
- **meta_title**: HTML meta title for SEO
- **meta_description**: HTML meta description for SEO
- **meta_keywords**: HTML meta keywords for SEO

#### Category Associations

- **categories**: Nested subcategories
- **products**: Products assigned to category

#### Category REST API Endpoints

```
GET    /api/categories               # List all categories
GET    /api/categories/{id}          # Get specific category
POST   /api/categories               # Create new category
PUT    /api/categories/{id}          # Update category
DELETE /api/categories/{id}          # Delete category
```

### Customers

Customers represent registered users and guest purchasers in the system.

#### Customer Fields

- **id**: Unique customer identifier
- **id_default_group**: Default customer group for pricing rules
- **id_lang**: Preferred language ID
- **id_shop**: Shop assignment
- **id_shop_group**: Shop group assignment
- **firstname**: Customer first name
- **lastname**: Customer last name
- **email**: Email address (unique identifier)
- **passwd**: Hashed password
- **id_gender**: Gender classification (1=Male, 2=Female, 9=Other)
- **birthday**: Date of birth (YYYY-MM-DD format)
- **newsletter**: Boolean for newsletter subscription
- **optin**: Boolean for marketing opt-in
- **active**: Boolean enabling/disabling customer account
- **is_guest**: Boolean indicating guest checkout status
- **deleted**: Boolean for soft-delete functionality
- **note**: Internal notes about customer
- **company**: Associated company name
- **siret**: French business identification number
- **ape**: French activity code
- **website**: Customer's website URL
- **outstanding_allow_amount**: Credit limit for customer
- **show_public_prices**: Boolean controlling price visibility
- **id_risk**: Risk classification for fraud prevention
- **max_payment_days**: Maximum payment terms in days
- **secure_key**: Unique security token for password recovery
- **last_passwd_gen**: Password generation timestamp
- **reset_password_token**: Token for password reset
- **reset_password_validity**: Expiration timestamp for reset token
- **ip_registration_newsletter**: IP address for newsletter signup
- **newsletter_date_add**: Newsletter subscription date
- **date_add**: Account creation timestamp
- **date_upd**: Last modification timestamp

#### Customer Associations

- **groups**: Customer groups for targeting and pricing

#### Customer REST API Endpoints

```
GET    /api/customers                # List all customers
GET    /api/customers/{id}           # Get specific customer
POST   /api/customers                # Create new customer
PUT    /api/customers/{id}           # Update customer
DELETE /api/customers/{id}           # Delete customer
```

### Orders

Orders represent customer purchases and transaction records.

Orders link customers to products with payment and fulfillment information. Complete order details would include:

- Customer reference linking to a Customer entity
- Order status tracking (pending, processing, shipped, etc.)
- Shipping and billing addresses
- Order items (OrderDetail entities) containing products and quantities
- Shipment tracking information
- Payment history and transaction records

#### Order Fields

| Field | Type | Description |
|-------|------|-------------|
| id | integer | Unique order identifier |
| id_customer | integer | Customer who placed the order |
| id_cart | integer | Associated shopping cart |
| id_currency | integer | Currency of the order |
| id_language | integer | Language of the order |
| id_shop | integer | Shop that processed order |
| current_state | integer | Current order state ID |
| payment | string | Payment method |
| invoice_number | integer | Invoice reference number |
| delivery_number | integer | Delivery/shipping reference |
| valid | boolean | Order validity status |
| date_add | datetime | Order creation timestamp |
| date_upd | datetime | Last update timestamp |
| shipping_number | string | Shipping tracking number |
| total_paid | decimal | Total amount paid |
| total_products | decimal | Total product value |
| total_discounts | decimal | Total discounts applied |
| total_shipping | decimal | Total shipping cost |

#### Order States

PrestaShop 1.7 defines standard order states:
- **0 - Awaiting payment**: Order created but payment not received
- **1 - Payment accepted**: Payment successfully processed
- **2 - Processing in progress**: Order being prepared
- **3 - Shipped**: Order dispatched to customer
- **4 - Delivered**: Confirmed customer receipt
- **5 - Canceled**: Order cancelled
- **9 - Payment error**: Payment processing failed

Each state can trigger automated actions and notifications.

#### Order REST API Endpoints

```
GET    /api/orders                   # List all orders
GET    /api/orders/{id}              # Get specific order
POST   /api/orders                   # Create new order
PUT    /api/orders/{id}              # Update order
DELETE /api/orders/{id}              # Delete order
```

### Stock Management

PrestaShop 1.7 supports advanced stock management through stock movements and inventory tracking.

#### Stock Movement Fields

Stock movements (stock_mvt resource) track all inventory changes:

- **id**: Stock movement identifier
- **id_product**: Product being tracked
- **id_product_attribute**: Combination/variant reference
- **id_warehouse**: Warehouse location
- **id_currency**: Currency for valuation
- **id_employee**: Employee who made the change
- **id_stock**: Associated stock record
- **id_stock_mvt_reason**: Reason code for movement (adjustment, sale, return, etc.)
- **id_order**: Associated order (if applicable)
- **id_supply_order**: Associated supply order (if applicable)
- **management_type**: Manual vs. automatic movement classification
- **product_name**: Snapshot of product name at movement time
- **reference**: Product reference code
- **ean13**: Product EAN barcode
- **upc**: Product UPC barcode
- **mpn**: Manufacturer part number
- **physical_quantity**: Quantity moved
- **sign**: Direction of movement (+ or -)
- **last_wa**: Previous weighted average cost
- **current_wa**: Updated weighted average cost
- **price_te**: Price without tax
- **date_add**: Movement timestamp

#### Stock Management Features

- **Advanced Stock Management**: Optional detailed tracking by warehouse and location
- **Low Stock Alerts**: Configurable thresholds with alert notifications
- **Weighted Average**: Cost tracking via weighted average method
- **Multi-warehouse**: Support for inventory across multiple warehouses
- **Stock Movements Audit Trail**: Complete history of all inventory changes

#### Stock REST API Endpoints

```
GET    /api/stock_movements          # List stock movements
GET    /api/stocks                   # Get current stock levels
```

### Modules

Modules extend PrestaShop functionality without modifying core code. The modular architecture allows:

- **Feature Extensions**: Add new functionality (payment gateways, shipping carriers, etc.)
- **Admin Enhancements**: Custom admin pages and features
- **Front-end Customization**: Theme modifications and customer-facing features
- **Hooks System**: Event-driven architecture for intercepting system processes
- **Configuration**: Module-specific settings and preferences

Key module concepts:
- Modules can hook into predefined extension points throughout PrestaShop
- Each module operates in isolated namespace
- Modules have lifecycle hooks (install, uninstall, enable, disable)
- Module permissions controlled separately from core webservice

### Configurations

System configurations store PrestaShop settings and preferences.

#### Configuration Resource Fields

Configuration entries are key-value pairs with:
- **name**: Configuration key identifier (e.g., 'PS_MULTISHOP_FEATURE_ACTIVE')
- **value**: Configuration value (string)
- **id_shop**: Shop-specific override (optional)

#### Configuration Management

Managing configurations via REST API requires:

1. **Query for existence**: Filter configurations by name
2. **Get blank schema**: Retrieve template for new configurations
3. **Update values**: Modify the configuration XML/JSON
4. **Post/Put request**: Create or update the configuration

#### Common Configuration Keys

- **PS_MULTISHOP_FEATURE_ACTIVE**: Enable multi-shop support
- **PS_LANGUAGE_DEFAULT**: Default system language
- **PS_CURRENCY_DEFAULT**: Default currency

#### Configuration REST API Endpoints

```
GET    /api/configurations           # List all configurations
GET    /api/configurations/{id}      # Get specific configuration
POST   /api/configurations           # Create new configuration
PUT    /api/configurations/{id}      # Update configuration
DELETE /api/configurations/{id}      # Delete configuration
```

### Warehouse

Warehouses manage physical inventory locations (used with Stock Management):

| Field | Description |
|-------|-------------|
| id_warehouse | Unique warehouse identifier |
| name | Warehouse name/location |
| address | Physical address |
| city | City location |
| postal_code | Postal/zip code |
| country | Country code |
| deleted | Soft-delete flag |

### Supply Order

Supply orders track inventory replenishment from suppliers:

| Field | Description |
|-------|-------------|
| id_supply_order | Unique supply order identifier |
| supplier_name | Supplier name |
| id_supplier | Supplier entity ID |
| id_warehouse | Destination warehouse |
| reference | PO reference number |
| date_delivery_expected | Expected arrival date |
| total_te | Total tax-excluded amount |
| total_with_tax | Total tax-included amount |
| status | Order status (pending, received, canceled) |

### Address

Addresses store customer location information (delivery and billing):

| Field | Description |
|-------|-------------|
| id_address | Unique address identifier |
| id_customer | Associated customer |
| alias | Address nickname (e.g., "Home", "Office") |
| firstname | First name |
| lastname | Last name |
| company | Company name (optional) |
| address1 | Street address line 1 |
| address2 | Street address line 2 |
| postcode | Postal/zip code |
| city | City name |
| id_country | Country identifier |
| phone | Contact phone |
| active | Whether address is active |

## Data Models and Relationships

### Entity Relationship Overview

```
Product
├── id_manufacturer → Manufacturer
├── id_supplier → Supplier
├── id_category_default → Category
├── id_tax_rules_group → TaxRulesGroup
├── combinations (ProductAttribute) → Product Options
│   └── images → Image
│   └── product_option_values → OptionValue
├── categories (many) → Category
├── images → Image
├── product_option_values → OptionValue
├── product_features → Feature
└── tags → Tag

Category
├── id_parent → Category (parent)
├── categories (children) → Category
└── products (many) → Product

Customer
├── id_default_group → Group
├── id_lang → Language
├── groups (many) → Group
└── orders (many) → Order

Order
├── id_customer → Customer
├── id_address_delivery → Address
├── id_address_invoice → Address
├── order_details (many) → OrderDetail
│   └── id_product → Product
│   └── product_attribute_id → ProductAttribute/Combination
└── order_slips (many) → OrderSlip

StockMovement
├── id_product → Product
├── id_product_attribute → ProductAttribute/Combination
├── id_warehouse → Warehouse
├── id_order → Order
└── id_supply_order → SupplyOrder
```

### Key Relationships

**Products and Categories (Many-to-Many)**
- Products can belong to multiple categories
- Default category (id_category_default) used for navigation
- Association includes all categories via product associations

**Products and Combinations (One-to-Many)**
- Each product can have multiple combinations/variants
- Combinations represent product options (size, color, etc.)
- Each combination has unique SKU and can have different pricing

**Products and Images (One-to-Many)**
- Multiple images per product
- Default image (id_default_image) for listing display
- Images can be associated with specific combinations

**Products and Attributes/Options**
- Product option values define available choices
- Combinations link these options to specific variants
- Enables flexible product configuration

**Customers and Orders (One-to-Many)**
- Each order references a customer
- Customers can have multiple orders
- Order contains all transaction details

**Orders and Products (Many-to-Many)**
- OrderDetails join entity links orders to products
- Includes quantity, price, and variant details
- Maintains historical pricing at order time

**Products and Stock Movements (One-to-Many)**
- Complete audit trail of all inventory changes
- Tracks movement reasons, locations, and costs
- Multi-warehouse support through warehouse reference

## REST API Fundamentals

### API Access

#### Endpoint Structure

- **Root installation**: `http://example.com/api/`
- **Subfolder installation**: `http://example.com/prestashop/api/`

#### Resource Pattern

All resources follow REST conventions:
```
GET    /api/{resource}               # List all
GET    /api/{resource}/{id}          # Get one
POST   /api/{resource}               # Create
PUT    /api/{resource}/{id}          # Update
DELETE /api/{resource}/{id}          # Delete
HEAD   /api/{resource}               # Check existence
```

### Authentication

PrestaShop uses webservice access keys for API authentication. Keys are generated in the admin panel and grant permissions at the resource level.

#### Access Key Generation

Access keys are 32-character alphanumeric strings (e.g., `UCCLLQ9N2ARSHWCXLT74KUKSSK34BFKX`).

#### Authentication Methods

**1. Authorization Header (Recommended)**

Most secure method using HTTP Basic Authentication:

```
Authorization: Basic {base64_encoded_key}
```

Where base64_encoded_key is:
```
base64_encode(API_KEY + ':')
```

PHP example:
```php
$apiKey = 'UCCLLQ9N2ARSHWCXLT74KUKSSK34BFKX';
$authorizationKey = base64_encode($apiKey . ':');
// Result: VUNDTExROU4yQVJTSFdDWExUNzRLVUtTU0szNEJGS1g6
```

**2. URL-based Authentication (Not Recommended for Production)**

Include key directly in URL:
```
https://UCCLLQ9N2ARSHWCXLT74KUKSSK34BFKX@example.com/api/
```

Warning: Exposes key in browser history and server logs.

**3. Browser Prompt**

Accessing API via browser prompts for username (key) with no password required.

### Response Formats

#### XML Format (Default)

Default response format uses XML:
```xml
<prestashop xmlns:xlink="http://www.w3.org/1999/xlink">
  <resource>
    <field><![CDATA[value]]></field>
  </resource>
</prestashop>
```

#### JSON Format

Request JSON responses using query parameter:
```
GET /api/products?output_format=JSON
GET /api/products?io_format=JSON
```

Or via HTTP header:
```
Io-Format: JSON
Output-Format: JSON
```

### Request/Response Examples

#### List Products
```
GET /api/products?limit=10&page=1
Authorization: Basic VUNDTExROU4yQVJTSFdDWExUNzRLVUtTU0szNEJGS1g6
```

Response (XML):
```xml
<prestashop>
  <products>
    <product>
      <id>1</id>
      <reference>PROD001</reference>
      <name>Product Name</name>
      <price>29.99</price>
    </product>
  </products>
</prestashop>
```

#### Create Product
```
POST /api/products
Authorization: Basic VUNDTExROU4yQVJTSFdDWExUNzRLVUtTU0szNEJGS1g6
Content-Type: application/xml

<prestashop>
  <product>
    <name><language id="1"><![CDATA[New Product]]></language></name>
    <price>19.99</price>
    <active>1</active>
  </product>
</prestashop>
```

Response:
```xml
<prestashop>
  <product>
    <id>123</id>
    <link>/api/products/123</link>
  </product>
</prestashop>
```

### Permissions

Access keys have granular permission control per resource:

```php
$permissions = [
  'customers' => ['GET' => 1, 'POST' => 1, 'PUT' => 1, 'DELETE' => 1, 'HEAD' => 1],
  'orders' => ['GET' => 1, 'POST' => 1, 'PUT' => 1, 'DELETE' => 1, 'HEAD' => 1],
  'products' => ['GET' => 1, 'POST' => 1, 'PUT' => 1, 'DELETE' => 1, 'HEAD' => 1],
];

WebserviceKey::setPermissionForAccount($apiAccess->id, $permissions);
```

Permission levels:
- **GET**: Read access to resource
- **POST**: Create new resources
- **PUT**: Update existing resources
- **DELETE**: Remove resources
- **HEAD**: Check existence without fetching

### Special Parameters

#### Specific Price Queries

Products and combinations support dynamic pricing queries:

```
GET /api/products/2?price[my_price][use_tax]=1&price[my_price][product_attribute]=25
```

This returns product with custom price calculated for specific combination and tax treatment.

#### Pagination and Large Datasets

When retrieving large result sets:
- Use the `limit` parameter to control results per request (default usually 50)
- Use `offset` parameter to retrieve subsequent pages: `?limit=50&offset=0`, `?limit=50&offset=50`, etc.
- Always check total count in response to know total available items
- For performance, retrieve only needed fields using `fields` parameter

Example paginated request:
```
GET /api/products?limit=100&offset=200&fields=id,name,price,reference
```

#### Rate Limiting Considerations

- API calls per second may be limited depending on PrestaShop configuration
- Implement exponential backoff when receiving 429 (Too Many Requests) responses
- Batch operations when possible to reduce total API calls
- Cache frequently accessed data locally when safe to do so

### PHP Webservice Library

PrestaShop provides official PHP library for simplified API interaction:

```php
<?php
require_once('./vendor/autoload.php');

$webServiceUrl = 'http://example.com/';
$webServiceKey = 'ZR92FNY5UFRERNI3O9Z5QDHWKTP3YIIT';
$webService = new PrestaShopWebservice($webServiceUrl, $webServiceKey, false);

// GET request
try {
    $xml = $webService->get(['resource' => 'customers', 'limit' => 10]);
} catch (PrestaShopWebserviceException $e) {
    echo 'Error: ' . $e->getMessage();
}

// POST request
try {
    $webService->add([
        'resource' => 'customers',
        'postXml' => $customerXml->asXML(),
    ]);
} catch (PrestaShopWebserviceException $e) {
    echo 'Error: ' . $e->getMessage();
}

// PUT request
try {
    $webService->edit([
        'resource' => 'customers',
        'id' => 5,
        'putXml' => $customerXml->asXML(),
    ]);
} catch (PrestaShopWebserviceException $e) {
    echo 'Error: ' . $e->getMessage();
}
```

## Best Practices

### Security

1. **Protect API Keys**: Store keys securely, never commit to version control
2. **Use HTTPS**: Always use encrypted connections for API calls
3. **Use Authorization Headers**: Prefer header-based authentication over URL parameters
4. **Principle of Least Privilege**: Grant only necessary permissions to keys
5. **Audit Trail**: Monitor API access and maintain logs
6. **Key Rotation**: Regularly rotate API keys and retire unused ones

### Performance

1. **Limit Parameter**: Use `limit` parameter to reduce response sizes
2. **Pagination**: Implement pagination for large datasets
3. **Selective Fields**: Use `display` parameter to fetch only needed fields
4. **Batch Operations**: Group related requests where possible
5. **Caching**: Cache API responses to reduce redundant requests
6. **Index Usage**: Leverage `indexed=1` for searchable products

### Data Integrity

1. **Validation**: Validate all input data before sending to API
2. **Error Handling**: Implement comprehensive error handling for all API calls
3. **Idempotency**: Design operations to be safely retryable
4. **Transaction Management**: Plan operations considering multi-step workflows
5. **Data Consistency**: Verify associations and foreign key relationships

### API Usage Patterns

1. **Combination Handling**: When working with variants, always include combination associations
2. **Language Support**: Always provide multi-language data for supported fields
3. **Image Management**: Load images after product creation for better performance
4. **Metadata**: Always include SEO metadata (meta_title, meta_description, meta_keywords)
5. **Default Values**: Set appropriate defaults (id_shop_default, id_category_default, etc.)

### Error Handling

Common error scenarios:

- **400 Bad Request**: Invalid XML/JSON structure or missing required fields
- **401 Unauthorized**: Invalid API key or missing authentication
- **403 Forbidden**: API key lacks permission for requested operation
- **404 Not Found**: Resource does not exist
- **409 Conflict**: Constraint violation (e.g., duplicate entry)
- **500 Server Error**: Server-side error in processing

Always implement retry logic with exponential backoff for transient failures.
