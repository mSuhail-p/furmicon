// var createError = require('http-errors');
var express = require('express');
var path = require('path');
// var cookieParser = require('cookie-parser');
// var logger = require('morgan');

var adminRouter = require('./routes/admin');
var usersRouter = require('./routes/users');
const { log } = require('console');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

//PORT
const PORT = process.env.PORT ||3000

// app.use(logger('dev'))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));  

app.use('/admin', adminRouter );
app.use('/', usersRouter);

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

app.listen(PORT,()=>{
  console.log("working");
})




// module.exports = app;



<div id="editModal" class="modal">
<div class="modal-content">
    <form id="editCategoryForm" method="post" action="/admin/editCategory">
        <!-- Name field -->
        <div class="mb-3">
            <label for="name" class="form-label">Name:</label>
            <input type="text" id="name" name="name" class="form-control rounded" required>
        </div>

        <!-- Category field -->
        <div class="mb-3">
            <label for="category" class="form-label">Category:</label>
            <input type="text" id="category" name="category" class="form-control rounded" required>
        </div>

        <!-- Price field -->
        <div class="mb-3">
            <label for="price" class="form-label">Price:</label>
            <input type="number" id="price" name="price" class="form-control rounded" required>
        </div>

        <!-- Quantity field -->
        <div class="mb-3">
            <label for="quantity" class="form-label">Quantity:</label>
            <input type="number" id="quantity" name="quantity" class="form-control rounded" required>
        </div>

        <!-- Image fields (up to 3) -->
        <div class="mb-3">
            <label for="image1" class="form-label">Image 1:</label>
            <input type="file" id="image1" name="image1" class="form-control rounded">
        </div>

        <div class="mb-3">
            <label for="image2" class="form-label">Image 2:</label>
            <input type="file" id="image2" name="image2" class="form-control rounded">
        </div>

        <div class="mb-3">
            <label for="image3" class="form-label">Image 3:</label>
            <input type="file" id="image3" name="image3" class="form-control rounded">
        </div>

        <!-- Description field -->
        <div class="mb-3">
            <label for="description" class="form-label">Description:</label>
            <textarea id="description" name="description" rows="4" class="form-control rounded" required></textarea>
        </div>

        <!-- Action button -->
        <button type="submit" class="btn btn-success text-md-center  ">Add Category</button>

        <!-- Close button -->
        <span class="close">&times;</span>
    </form>
</div>
</div>




<style>
/* CSS for the modal and form */
.modal {
display: none;
position: fixed;
z-index: 1;
left: 0;
top: 0;
width: 100%;
height: 100%;
overflow: auto;
background-color: rgba(0, 0, 0, 0.4);
}

.modal-content {
background-color: #fefefe;
margin: 15% auto;
padding: 20px;
border: 1px solid #888;
width: 40%;
}

form {
display: grid;
gap: 10px;
}

label {
font-weight: bold;
}

textarea,
input {
width: 100%;
padding: 8px;
margin-top: 4px;
box-sizing: border-box;
}

#addCategoryBtn {
background-color: #4caf50;
color: white;
border: none;
padding: 10px 15px;
text-align: center;
text-decoration: none;
display: inline-block;
font-size: 16px;
margin-top: 10px;
cursor: pointer;
}

#addCategoryBtn:hover {
background-color: #45a049;
}

.close {
color: #aaa;
float: right;
font-size: 28px;
font-weight: bold;
}

.close:hover {
color: black;
text-decoration: none;
cursor: pointer;
}
</style>



<!--  THIS IS SCRIPTS FOR EDIT BUTTON OF CATEGORY  -->

<script>

// Add this script in your EJS file or a separate JavaScript file
document.getElementById('editButton').addEventListener('click', function () {
document.getElementById('editModal').style.display = 'block';
});

document.getElementsByClassName('close')[0].addEventListener('click', function () {
document.getElementById('editModal').style.display = 'none';
});

// Close modal if user clicks outside the modal content
window.addEventListener('click', function (event) {
if (event.target == document.getElementById('editModal')) {
    document.getElementById('editModal').style.display = 'none';
}
});


</script>



<div class="col-4">
<figure class="product-media">
    <a href="product.html">
        <img src="assets/images/demos/demo-11/products/product-1.jpg" alt="Product image"
            class="product-image" >
    </a>

    <div class="product-action-vertical">
        <a href="#" class="btn-product-icon btn-wishlist btn-expandable"><span>add to
                wishlist</span></a>
    </div><!-- End .product-action -->

    <div class="product-action">
        <a href="popup/quickView.html" class="btn-product btn-quickview"
            title="Quick view"><span>quick view</span></a>
    </div><!-- End .product-action -->
</figure><!-- End .product-media -->

<div class="product-body">
    <h3 class="product-title"><a href="product.html"><%= element.name %></a></h3>
    <!-- End .product-title -->

    <div class="product-action">
        <a href="#" class="btn-product btn-cart"><span>add to cart</span><i
                class="icon-long-arrow-right"></i></a>
    </div><!-- End .product-action -->
</div><!-- End .product-body -->
</div>End .product




//DASH BOAD 
103 TO 569










<header class="main-header navbar">
<div class="col-search">
    <form class="searchform">
        <div class="input-group">
            <input list="search_terms" type="text" class="form-control" placeholder="Search term" />
            <button class="btn btn-light bg" type="button"><i class="material-icons md-search"></i></button>
        </div>
        <datalist id="search_terms">
            <option value="Products"></option>
            <option value="New orders"></option>
            <option value="Apple iphone"></option>
            <option value="Ahmed Hassan"></option>
        </datalist>
    </form>
</div>
<div class="col-nav">
    <button class="btn btn-icon btn-mobile me-auto" data-trigger="#offcanvas_aside"><i class="material-icons md-apps"></i></button>
    <ul class="nav">
        <li class="nav-item">
            <a class="nav-link btn-icon" href="#">
                <i class="material-icons md-notifications animation-shake"></i>
                <span class="badge rounded-pill">3</span>
            </a>
        </li>
        <li class="nav-item">
            <a class="nav-link btn-icon darkmode" href="#"> <i class="material-icons md-nights_stay"></i> </a>
        </li>
        <li class="nav-item">
            <a href="#" class="requestfullscreen nav-link btn-icon"><i class="material-icons md-cast"></i></a>
        </li>
        <li class="dropdown nav-item">
            <a class="dropdown-toggle" data-bs-toggle="dropdown" href="#" id="dropdownLanguage" aria-expanded="false"><i class="material-icons md-public"></i></a>
            <div class="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownLanguage">
                <a class="dropdown-item text-brand" href="#"><img src="assets/imgs/theme/flag-us.png" alt="English" />English</a>
                <a class="dropdown-item" href="#"><img src="assets/imgs/theme/flag-fr.png" alt="Français" />Français</a>
                <a class="dropdown-item" href="#"><img src="assets/imgs/theme/flag-jp.png" alt="Français" />日本語</a>
                <a class="dropdown-item" href="#"><img src="assets/imgs/theme/flag-cn.png" alt="Français" />中国人</a>
            </div>
        </li>
        <li class="dropdown nav-item">
            <a class="dropdown-toggle" data-bs-toggle="dropdown" href="#" id="dropdownAccount" aria-expanded="false"> <img class="img-xs rounded-circle" src="assets/imgs/people/avatar-2.png" alt="User" /></a>
            <div class="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownAccount">
                <a class="dropdown-item" href="#"><i class="material-icons md-perm_identity"></i>Edit Profile</a>
                <a class="dropdown-item" href="#"><i class="material-icons md-settings"></i>Account Settings</a>
                <a class="dropdown-item" href="#"><i class="material-icons md-account_balance_wallet"></i>Wallet</a>
                <a class="dropdown-item" href="#"><i class="material-icons md-receipt"></i>Billing</a>
                <a class="dropdown-item" href="#"><i class="material-icons md-help_outline"></i>Help center</a>
                <div class="dropdown-divider"></div>
                <a class="dropdown-item text-danger" href="#"><i class="material-icons md-exit_to_app"></i>Logout</a>
            </div>
        </li>
    </ul>
</div>
</header>
<section class="content-main">
<div class="content-header">
    <div>
        <h2 class="content-title card-title">Dashboard</h2>
        <p>Whole data about your business here</p>
    </div>
    <div>
        <a href="#" class="btn btn-primary"><i class="text-muted material-icons md-post_add"></i>Create report</a>
    </div>
</div>
<div class="row">
    <div class="col-lg-3">
        <div class="card card-body mb-4">
            <article class="icontext">
                <span class="icon icon-sm rounded-circle bg-primary-light"><i class="text-primary material-icons md-monetization_on"></i></span>
                <div class="text">
                    <h6 class="mb-1 card-title">Revenue</h6>
                    <span>$13,456.5</span>
                    <span class="text-sm"> Shipping fees are not included </span>
                </div>
            </article>
        </div>
    </div>
    <div class="col-lg-3">
        <div class="card card-body mb-4">
            <article class="icontext">
                <span class="icon icon-sm rounded-circle bg-success-light"><i class="text-success material-icons md-local_shipping"></i></span>
                <div class="text">
                    <h6 class="mb-1 card-title">Orders</h6>
                    <span>53.668</span>
                    <span class="text-sm"> Excluding orders in transit </span>
                </div>
            </article>
        </div>
    </div>
    <div class="col-lg-3">
        <div class="card card-body mb-4">
            <article class="icontext">
                <span class="icon icon-sm rounded-circle bg-warning-light"><i class="text-warning material-icons md-qr_code"></i></span>
                <div class="text">
                    <h6 class="mb-1 card-title">Products</h6>
                    <span>9.856</span>
                    <span class="text-sm"> In 19 Categories </span>
                </div>
            </article>
        </div>
    </div>
    <div class="col-lg-3">
        <div class="card card-body mb-4">
            <article class="icontext">
                <span class="icon icon-sm rounded-circle bg-info-light"><i class="text-info material-icons md-shopping_basket"></i></span>
                <div class="text">
                    <h6 class="mb-1 card-title">Monthly Earning</h6>
                    <span>$6,982</span>
                    <span class="text-sm"> Based in your local time. </span>
                </div>
            </article>
        </div>
    </div>
</div>
<div class="row">
    <div class="col-xl-8 col-lg-12">
        <div class="card mb-4">
            <article class="card-body">
                <h5 class="card-title">Sale statistics</h5>
                <canvas id="myChart" height="120px"></canvas>
            </article>
        </div>
        <div class="row">
            <div class="col-lg-5">
                <div class="card mb-4">
                    <article class="card-body">
                        <h5 class="card-title">New Members</h5>
                        <div class="new-member-list">
                            <div class="d-flex align-items-center justify-content-between mb-4">
                                <div class="d-flex align-items-center">
                                    <img src="assets/imgs/people/avatar-4.png" alt="" class="avatar" />
                                    <div>
                                        <h6>Patric Adams</h6>
                                        <p class="text-muted font-xs">Sanfrancisco</p>
                                    </div>
                                </div>
                                <a href="#" class="btn btn-xs"><i class="material-icons md-add"></i> Add</a>
                            </div>
                            <div class="d-flex align-items-center justify-content-between mb-4">
                                <div class="d-flex align-items-center">
                                    <img src="assets/imgs/people/avatar-2.png" alt="" class="avatar" />
                                    <div>
                                        <h6>Dilan Specter</h6>
                                        <p class="text-muted font-xs">Sanfrancisco</p>
                                    </div>
                                </div>
                                <a href="#" class="btn btn-xs"><i class="material-icons md-add"></i> Add</a>
                            </div>
                            <div class="d-flex align-items-center justify-content-between mb-4">
                                <div class="d-flex align-items-center">
                                    <img src="assets/imgs/people/avatar-3.png" alt="" class="avatar" />
                                    <div>
                                        <h6>Tomas Baker</h6>
                                        <p class="text-muted font-xs">Sanfrancisco</p>
                                    </div>
                                </div>
                                <a href="#" class="btn btn-xs"><i class="material-icons md-add"></i> Add</a>
                            </div>
                        </div>
                    </article>
                </div>
            </div>
            <div class="col-lg-7">
                <div class="card mb-4">
                    <article class="card-body">
                        <h5 class="card-title">Recent activities</h5>
                        <ul class="verti-timeline list-unstyled font-sm">
                            <li class="event-list">
                                <div class="event-timeline-dot">
                                    <i class="material-icons md-play_circle_outline font-xxl"></i>
                                </div>
                                <div class="media">
                                    <div class="me-3">
                                        <h6><span>Today</span> <i class="material-icons md-trending_flat text-brand ml-15 d-inline-block"></i></h6>
                                    </div>
                                    <div class="media-body">
                                        <div>Lorem ipsum dolor sit amet consectetur</div>
                                    </div>
                                </div>
                            </li>
                            <li class="event-list active">
                                <div class="event-timeline-dot">
                                    <i class="material-icons md-play_circle_outline font-xxl animation-fade-right"></i>
                                </div>
                                <div class="media">
                                    <div class="me-3">
                                        <h6><span>17 May</span> <i class="material-icons md-trending_flat text-brand ml-15 d-inline-block"></i></h6>
                                    </div>
                                    <div class="media-body">
                                        <div>Debitis nesciunt voluptatum dicta reprehenderit</div>
                                    </div>
                                </div>
                            </li>
                            <li class="event-list">
                                <div class="event-timeline-dot">
                                    <i class="material-icons md-play_circle_outline font-xxl"></i>
                                </div>
                                <div class="media">
                                    <div class="me-3">
                                        <h6><span>13 May</span> <i class="material-icons md-trending_flat text-brand ml-15 d-inline-block"></i></h6>
                                    </div>
                                    <div class="media-body">
                                        <div>Accusamus voluptatibus voluptas.</div>
                                    </div>
                                </div>
                            </li>
                            <li class="event-list">
                                <div class="event-timeline-dot">
                                    <i class="material-icons md-play_circle_outline font-xxl"></i>
                                </div>
                                <div class="media">
                                    <div class="me-3">
                                        <h6><span>05 April</span> <i class="material-icons md-trending_flat text-brand ml-15 d-inline-block"></i></h6>
                                    </div>
                                    <div class="media-body">
                                        <div>At vero eos et accusamus et iusto odio dignissi</div>
                                    </div>
                                </div>
                            </li>
                            <li class="event-list">
                                <div class="event-timeline-dot">
                                    <i class="material-icons md-play_circle_outline font-xxl"></i>
                                </div>
                                <div class="media">
                                    <div class="me-3">
                                        <h6><span>26 Mar</span> <i class="material-icons md-trending_flat text-brand ml-15 d-inline-block"></i></h6>
                                    </div>
                                    <div class="media-body">
                                        <div>Responded to need “Volunteer Activities</div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </article>
                </div>
            </div>
        </div>
    </div>
    <div class="col-xl-4 col-lg-12">
        <div class="card mb-4">
            <article class="card-body">
                <h5 class="card-title">Revenue Base on Area</h5>
                <canvas id="myChart2" height="217"></canvas>
            </article>
        </div>
        <div class="card mb-4">
            <article class="card-body">
                <h5 class="card-title">Marketing Chanel</h5>
                <span class="text-muted font-xs">Facebook</span>
                <div class="progress mb-3">
                    <div class="progress-bar" role="progressbar" style="width: 15%">15%</div>
                </div>
                <span class="text-muted font-xs">Instagram</span>
                <div class="progress mb-3">
                    <div class="progress-bar" role="progressbar" style="width: 65%">65%</div>
                </div>
                <span class="text-muted font-xs">Google</span>
                <div class="progress mb-3">
                    <div class="progress-bar" role="progressbar" style="width: 51%">51%</div>
                </div>
                <span class="text-muted font-xs">Twitter</span>
                <div class="progress mb-3">
                    <div class="progress-bar" role="progressbar" style="width: 80%">80%</div>
                </div>
                <span class="text-muted font-xs">Other</span>
                <div class="progress mb-3">
                    <div class="progress-bar" role="progressbar" style="width: 80%">80%</div>
                </div>
            </article>
        </div>
    </div>
</div>
<div class="card mb-4">
    <header class="card-header">
        <h4 class="card-title">Latest orders</h4>
        <div class="row align-items-center">
            <div class="col-md-3 col-12 me-auto mb-md-0 mb-3">
                <div class="custom_select">
                    <select class="form-select select-nice">
                        <option selected>All Categories</option>
                        <option>Women's Clothing</option>
                        <option>Men's Clothing</option>
                        <option>Cellphones</option>
                        <option>Computer & Office</option>
                        <option>Consumer Electronics</option>
                        <option>Jewelry & Accessories</option>
                        <option>Home & Garden</option>
                        <option>Luggage & Bags</option>
                        <option>Shoes</option>
                        <option>Mother & Kids</option>
                    </select>
                </div>
            </div>
            <div class="col-md-2 col-6">
                <input type="date" value="02.05.2021" class="form-control" />
            </div>
            <div class="col-md-2 col-6">
                <div class="custom_select">
                    <select class="form-select select-nice">
                        <option selected>Status</option>
                        <option>All</option>
                        <option>Paid</option>
                        <option>Chargeback</option>
                        <option>Refund</option>
                    </select>
                </div>
            </div>
        </div>
    </header>
    <div class="card-body">
        <div class="table-responsive">
            <div class="table-responsive">
                <table class="table align-middle table-nowrap mb-0">
                    <thead class="table-light">
                        <tr>
                            <th scope="col" class="text-center">
                                <div class="form-check align-middle">
                                    <input class="form-check-input" type="checkbox" id="transactionCheck01" />
                                    <label class="form-check-label" for="transactionCheck01"></label>
                                </div>
                            </th>
                            <th class="align-middle" scope="col">Order ID</th>
                            <th class="align-middle" scope="col">Billing Name</th>
                            <th class="align-middle" scope="col">Date</th>
                            <th class="align-middle" scope="col">Total</th>
                            <th class="align-middle" scope="col">Payment Status</th>
                            <th class="align-middle" scope="col">Payment Method</th>
                            <th class="align-middle" scope="col">View Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="text-center">
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" id="transactionCheck02" />
                                    <label class="form-check-label" for="transactionCheck02"></label>
                                </div>
                            </td>
                            <td><a href="#" class="fw-bold">#SK2540</a></td>
                            <td>Neal Matthews</td>
                            <td>07 Oct, 2021</td>
                            <td>$400</td>
                            <td>
                                <span class="badge badge-pill badge-soft-success">Paid</span>
                            </td>
                            <td><i class="material-icons md-payment font-xxl text-muted mr-5"></i> Mastercard</td>
                            <td>
                                <a href="#" class="btn btn-xs"> View details</a>
                            </td>
                        </tr>
                        <tr>
                            <td class="text-center">
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" id="transactionCheck03" />
                                    <label class="form-check-label" for="transactionCheck03"></label>
                                </div>
                            </td>
                            <td><a href="#" class="fw-bold">#SK2541</a></td>
                            <td>Jamal Burnett</td>
                            <td>07 Oct, 2021</td>
                            <td>$380</td>
                            <td>
                                <span class="badge badge-pill badge-soft-danger">Chargeback</span>
                            </td>
                            <td><i class="material-icons md-payment font-xxl text-muted mr-5"></i> Visa</td>
                            <td>
                                <a href="#" class="btn btn-xs"> View details</a>
                            </td>
                        </tr>
                        <tr>
                            <td class="text-center">
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" id="transactionCheck04" />
                                    <label class="form-check-label" for="transactionCheck04"></label>
                                </div>
                            </td>
                            <td><a href="#" class="fw-bold">#SK2542</a></td>
                            <td>Juan Mitchell</td>
                            <td>06 Oct, 2021</td>
                            <td>$384</td>
                            <td>
                                <span class="badge badge-pill badge-soft-success">Paid</span>
                            </td>
                            <td><i class="material-icons md-payment font-xxl text-muted mr-5"></i> Paypal</td>
                            <td>
                                <a href="#" class="btn btn-xs"> View details</a>
                            </td>
                        </tr>
                        <tr>
                            <td class="text-center">
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" id="transactionCheck05" />
                                    <label class="form-check-label" for="transactionCheck05"></label>
                                </div>
                            </td>
                            <td><a href="#" class="fw-bold">#SK2543</a></td>
                            <td>Barry Dick</td>
                            <td>05 Oct, 2021</td>
                            <td>$412</td>
                            <td>
                                <span class="badge badge-pill badge-soft-success">Paid</span>
                            </td>
                            <td><i class="material-icons md-payment font-xxl text-muted mr-5"></i> Mastercard</td>
                            <td>
                                <a href="#" class="btn btn-xs"> View details</a>
                            </td>
                        </tr>
                        <tr>
                            <td class="text-center">
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" id="transactionCheck06" />
                                    <label class="form-check-label" for="transactionCheck06"></label>
                                </div>
                            </td>
                            <td><a href="#" class="fw-bold">#SK2544</a></td>
                            <td>Ronald Taylor</td>
                            <td>04 Oct, 2021</td>
                            <td>$404</td>
                            <td>
                                <span class="badge badge-pill badge-soft-warning">Refund</span>
                            </td>
                            <td><i class="material-icons md-payment font-xxl text-muted mr-5"></i> Visa</td>
                            <td>
                                <a href="#" class="btn btn-xs"> View details</a>
                            </td>
                        </tr>
                        <tr>
                            <td class="text-center">
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" id="transactionCheck07" />
                                    <label class="form-check-label" for="transactionCheck07"></label>
                                </div>
                            </td>
                            <td><a href="#" class="fw-bold">#SK2545</a></td>
                            <td>Jacob Hunter</td>
                            <td>04 Oct, 2021</td>
                            <td>$392</td>
                            <td>
                                <span class="badge badge-pill badge-soft-success">Paid</span>
                            </td>
                            <td><i class="material-icons md-payment font-xxl text-muted mr-5"></i> Paypal</td>
                            <td>
                                <a href="#" class="btn btn-xs"> View details</a>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <!-- table-responsive end// -->
    </div>
</div>
<div class="pagination-area mt-30 mb-50">
    <nav aria-label="Page navigation example">
        <ul class="pagination justify-content-start">
            <li class="page-item active"><a class="page-link" href="#">01</a></li>
            <li class="page-item"><a class="page-link" href="#">02</a></li>
            <li class="page-item"><a class="page-link" href="#">03</a></li>
            <li class="page-item"><a class="page-link dot" href="#">...</a></li>
            <li class="page-item"><a class="page-link" href="#">16</a></li>
            <li class="page-item">
                <a class="page-link" href="#"><i class="material-icons md-chevron_right"></i></a>
            </li>
        </ul>
    </nav>
</div>
</section>






//ADD CATEGORY


<!-- views/editCategory.ejs -->

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Edit Product</title>

    <!-- Include Bootstrap CSS (choose either local or CDN link) -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">

    <link rel="stylesheet" href="https://unpkg.com/cropperjs/dist/cropper.css">
    <script src="https://unpkg.com/cropperjs"></script>

</head>

<body class=" bg-secondary   ">




    <div class="container w-50 bg-white  rounded-3   mt-5">
        <h3 class="text-md-center ">Edit Product</h3>
            <form id="editCategoryForm" method="post" action="/admin/edit_product" enctype="multipart/form-data">
                <!-- Name field -->

                <% if(sendToEdit) { %>






                    <div class="mb-3">
                        <label for="name" class="form-label">Name:</label>
                        <input type="text" value="<%= sendToEdit.name %>" id="name" name="name" class="form-control rounded"
                            required>
                    </div>

                    <!-- Category field -->
                    <div class="mb-3">
                        <label for="category" class="form-label">Category:</label>
                        <select id="category" name="category" class="form-control rounded" required>
                            <option value="">
                                <%= sendToEdit.category.name %>
                            </option>
                            <% categories.forEach((element)=>{ %>
                                <option value="<%=element._id %>">
                                    <%= element.name %>
                                </option>
                                <% }) %>


                                    <!-- Add more options as needed -->
                        </select>
                    </div>

                    <!-- Price field -->
                    <div class="mb-3">
                        <label for="price" class="form-label">Price:</label>
                        <input type="number" value="<%= sendToEdit.price %>" id="price" name="price"
                            class="form-control rounded" required>
                    </div>

                    <!-- Quantity field -->
                    <div class="mb-3">
                        <label for="quantity" class="form-label">Quantity:</label>
                        <input type="number" value="<%= sendToEdit.quantity %>" id="quantity" name="quantity"
                            class="form-control rounded" required>
                    </div>

                    <!-- Image fields (up to 3) -->



                    <% sendToEdit.images.forEach((image, index)=> { %>
                        <div class="mb-3 existing-image-container">
                            <img src="/userImages/<%= image %>" alt="Existing Image <%= index + 1 %>" class="existing-image">
                            <label for="newImage<%= index + 1 %>" class="form-label">New Image <%= index + 1 %>:</label>
                            <input type="file" id="newImage<%= index + 1 %>" name="newImages" value="<%= image %>" class="focus-ring-rounded" accept="image/*">
                            <input type="hidden" name="existingImages[]" value="<%= image %>">
                        </div>
                    <% }) %>
                    
                            <style>
                                .existing-image {
                                    max-width: 100%;
                                    /* Adjust this value as needed */
                                    max-height: 200px;
                                    /* Adjust this value as needed */
                                    display: block;
                                    /* Prevents images from overflowing container */
                                    margin-bottom: 10px;
                                    /* Add margin for spacing */
                                }    
                            </style>



                            <!-- <div class="mb-3">
                    <label for="image2" class="form-label">Image 2:</label>
                    <input type="file" id="imageInput" name="image" class="form-control rounded">
                </div>

                <div class="mb-3">
                    <label for="image3" class="form-label">Image 3:</label>
                    <input type="file" id="imageInput" name="image" class="form-control rounded">
                </div> -->

                            <div class="mb-3">
                                <label for="description" class="form-label">Description:</label>
                                <textarea id="description" name="description" rows="4" class="form-control rounded"
                                    required><%= sendToEdit.description %></textarea>
                            </div>


                            <!-- Action button -->
                            <button type="submit" class="btn btn-success">Add product</button>
                            <input type="hidden" name="id" value="<%= sendToEdit._id %>">
            </form>
    </div>


    <% } %>
        <!-- Include Bootstrap JS (choose either local or CDN link) -->
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
            integrity="sha384-pzjw8W+8ML/LUEHI5ts7ZLxFWh1bSquyXvs1qKH/cz5EML5Z8eqt1OKtLqca/8aQ"
            crossorigin="anonymous"></script>



        <script>
            document.getElementById('imageInput').addEventListener('change', function (event) {
                const input = event.target;
                const imagePreview = document.getElementById('imagePreview');

                if (input.files && input.files[0]) {
                    const reader = new FileReader();
                    reader.onload = function (e) {
                        const image = new Image();
                        image.src = e.target.result;

                        // Clear previous content
                        imagePreview.innerHTML = '';

                        // Append the image to the container
                        imagePreview.appendChild(image);

                        // Initialize Cropper.js
                        const cropper = new Cropper(image, {
                            aspectRatio: 1, // Set the aspect ratio as needed
                            zoomable: false, // Set zoomable option based on your requirement
                        });
                    };

                    // Read the selected file as data URL
                    reader.readAsDataURL(input.files[0]);
                }
            });
        </script>

</body>

</html>

// ......................................................................





////////////////////////////////LOGIN PAGE ///////////////////
<!DOCTYPE html>
<html lang="en">


<!-- molla/login.html  22 Nov 2019 10:04:03 GMT -->

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <title>Molla - Bootstrap eCommerce Template</title>
    <meta name="keywords" content="HTML5 Template">
    <meta name="description" content="Molla - Bootstrap eCommerce Template">
    <meta name="author" content="p-themes">
    <!-- Favicon -->
    <link rel="apple-touch-icon" sizes="180x180" href="assets/images/icons/apple-touch-icon.png">
    <link rel="icon" type="image/png" sizes="32x32" href="assets/images/icons/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="assets/images/icons/favicon-16x16.png">
    <link rel="manifest" href="assets/images/icons/site.html">
    <link rel="mask-icon" href="assets/images/icons/safari-pinned-tab.svg" color="#666666">
    <link rel="shortcut icon" href="assets/images/icons/favicon.ico">
    <meta name="apple-mobile-web-app-title" content="Molla">
    <meta name="application-name" content="Molla">
    <meta name="msapplication-TileColor" content="#cc9966">
    <meta name="msapplicatio n-config" content="assets/images/icons/browserconfig.xml">
    <meta name="theme-color" content="#ffffff">
    <!-- Plugins CSS File -->
    <link rel="stylesheet" href="assets/css/bootstrap.min.css">
    <!-- Main CSS File -->
    <link rel="stylesheet" href="assets/css/style.css">
    <script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>

</head>

<body>
    <div class="page-wrapper">
        <header class="header">
            <div class="header-top">
                <div class="container">
                    <div class="header-left">
                        <div class="header-dropdown">
                            <a href="#">Usd</a>
                            <div class="header-menu">
                                <ul>
                                    <li><a href="#">Eur</a></li>
                                    <li><a href="#">Usd</a></li>
                                </ul>
                            </div><!-- End .header-menu -->
                        </div><!-- End .header-dropdown -->

                        <div class="header-dropdown">
                            <a href="#">Eng</a>
                            <div class="header-menu">
                                <ul>
                                    <li><a href="#">English</a></li>
                                    <li><a href="#">French</a></li>
                                    <li><a href="#">Spanish</a></li>
                                </ul>
                            </div><!-- End .header-menu -->
                        </div><!-- End .header-dropdown -->
                    </div><!-- End .header-left -->

                    <div class="header-right">
                        <ul class="top-menu">
                            <li>
                                <a href="#">Links</a>
                                <ul>
                                    <li><a href="tel:#"><i class="icon-phone"></i>Call: +0123 456 789</a></li>
                                    <li><a href="wishlist.html"><i class="icon-heart-o"></i>Wishlist
                                            <span>(3)</span></a></li>
                                    <li><a href="about.html">About Us</a></li>
                                    <li><a href="contact.html">Contact Us</a></li>

                                </ul>
                            </li>
                        </ul><!-- End .top-menu -->
                    </div><!-- End .header-right -->
                </div><!-- End .container -->
            </div><!-- End .header-top -->

            <div class="header-middle sticky-header">
                <div class="container">
                    <div class="header-left">
                        <button class="mobile-menu-toggler">
                            <span class="sr-only">Toggle mobile menu</span>
                            <i class="icon-bars"></i>
                        </button>

                        <a href="index.html" class="logo">
                            <img src="assets/images/logo.png" alt="Molla Logo" width="105" height="25">
                        </a>

                        <nav class="main-nav">
                            <ul class="menu sf-arrows ">
                                <li class="megamenu-container active">
                                    <a href="/home" class=" sf-with-ul text-dark  ">Home</a>

                                </li>


                                <li>
                                    <a href="product.html" class="sf-with-ul">Shop</a>

                                    <div class="megamenu megamenu-sm">
                                        <div class="row no-gutters">

                                        </div><!-- End .row -->
                                    </div><!-- End .megamenu megamenu-sm -->
                                </li>
                                <li>
                                    <a href="#" class="sf-with-ul">Contact</a>

                                </li>
                                <li>
                                    <a href="blog.html" class="sf-with-ul">About</a>


                                </li>

                            </ul><!-- End .menu -->
                        </nav><!-- End .main-nav -->
                    </div><!-- End .header-left -->

                    <div class="header-right">
                        <div class="header-search">
                            <a href="#" class="search-toggle" role="button" title="Search"><i
                                    class="icon-search"></i></a>
                            <form action="#" method="get">
                                <div class="header-search-wrapper">
                                    <label for="q" class="sr-only">Search</label>
                                    <input type="search" class="form-control" name="q" id="q" placeholder="Search in..."
                                        required>
                                </div><!-- End .header-search-wrapper -->
                            </form>
                        </div><!-- End .header-search -->
                        <div class="dropdown compare-dropdown">
                            <a href="#" class="dropdown-toggle" role="button" data-toggle="dropdown"
                                aria-haspopup="true" aria-expanded="false" data-display="static"
                                title="Compare Products" aria-label="Compare Products">
                                <i class="icon-random"></i>
                            </a>

                            <div class="dropdown-menu dropdown-menu-right">
                                <ul class="compare-products">
                                    <li class="compare-product">
                                        <a href="#" class="btn-remove" title="Remove Product"><i
                                                class="icon-close"></i></a>
                                        <h4 class="compare-product-title"><a href="product.html">Blue Night Dress</a>
                                        </h4>
                                    </li>
                                    <li class="compare-product">
                                        <a href="#" class="btn-remove" title="Remove Product"><i
                                                class="icon-close"></i></a>
                                        <h4 class="compare-product-title"><a href="product.html">White Long Skirt</a>
                                        </h4>
                                    </li>
                                </ul>

                                <div class="compare-actions">
                                    <a href="#" class="action-link">Clear All</a>
                                    <a href="#" class="btn btn-outline-primary-2"><span>Compare</span><i
                                            class="icon-long-arrow-right"></i></a>
                                </div>
                            </div><!-- End .dropdown-menu -->
                        </div><!-- End .compare-dropdown -->

                        <div class="dropdown cart-dropdown">
                            <a href="#" class="dropdown-toggle" role="button" data-toggle="dropdown"
                                aria-haspopup="true" aria-expanded="false" data-display="static">
                                <i class="icon-shopping-cart"></i>
                                <span class="cart-count">2</span>
                            </a>

                            <div class="dropdown-menu dropdown-menu-right">
                                <div class="dropdown-cart-products">
                                    <div class="product">
                                        <div class="product-cart-details">
                                            <h4 class="product-title">
                                                <a href="product.html">Beige knitted elastic runner shoes</a>
                                            </h4>

                                            <span class="cart-product-info">
                                                <span class="cart-product-qty">1</span>
                                                x $84.00
                                            </span>
                                        </div><!-- End .product-cart-details -->

                                        <figure class="product-image-container">
                                            <a href="product.html" class="product-image">
                                                <img src="assets/images/products/cart/product-1.jpg" alt="product">
                                            </a>
                                        </figure>
                                        <a href="#" class="btn-remove" title="Remove Product"><i
                                                class="icon-close"></i></a>
                                    </div><!-- End .product -->

                                    <div class="product">
                                        <div class="product-cart-details">
                                            <h4 class="product-title">
                                                <a href="product.html">Blue utility pinafore denim dress</a>
                                            </h4>

                                            <span class="cart-product-info">
                                                <span class="cart-product-qty">1</span>
                                                x $76.00
                                            </span>
                                        </div><!-- End .product-cart-details -->

                                        <figure class="product-image-container">
                                            <a href="product.html" class="product-image">
                                                <img src="assets/images/products/cart/product-2.jpg" alt="product">
                                            </a>
                                        </figure>
                                        <a href="#" class="btn-remove" title="Remove Product"><i
                                                class="icon-close"></i></a>
                                    </div><!-- End .product -->
                                </div><!-- End .cart-product -->

                                <div class="dropdown-cart-total">
                                    <span>Total</span>

                                    <span class="cart-total-price">$160.00</span>
                                </div><!-- End .dropdown-cart-total -->

                                <div class="dropdown-cart-action">
                                    <a href="cart.html" class="btn btn-primary">View Cart</a>
                                    <a href="checkout.html" class="btn btn-outline-primary-2"><span>Checkout</span><i
                                            class="icon-long-arrow-right"></i></a>
                                </div><!-- End .dropdown-cart-total -->
                            </div><!-- End .dropdown-menu -->
                        </div><!-- End .cart-dropdown -->
                    </div><!-- End .header-right -->
                </div><!-- End .container -->
            </div><!-- End .header-middle -->
        </header><!-- End .header -->

        <main class="main">
            <nav aria-label="breadcrumb" class="breadcrumb-nav border-0 mb-0">
                <div class="container">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item"><a href="index.html">Home</a></li>
                        <li class="breadcrumb-item"><a href="#">Pages</a></li>
                        <li class="breadcrumb-item active" aria-current="page">Login</li>
                    </ol>
                </div><!-- End .container -->
            </nav><!-- End .breadcrumb-nav -->

            <div class="login-page bg-image pt-8 pb-8 pt-md-12 pb-md-12 pt-lg-17 pb-lg-17"
                style="background-image: url('assets/images/backgrounds/wooden.jpg')">
                <div class="container ">
                    <div class="form-box">
                        <div class="form-tab  ">
                            <ul class="nav nav-pills nav-fill" role="tablist">
                                <li class="nav-item">
                                    <a class="nav-link" id="signin-tab-2" data-toggle="tab" href="#signin-2" role="tab"
                                        aria-controls="signin-2" aria-selected="false">Sign In</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link active" id="register-tab-2" data-toggle="tab" href="#register-2"
                                        role="tab" aria-controls="register-2" aria-selected="true">Register</a>
                                </li>

                            </ul>
                            <div class="tab-content">
                                <div class="tab-pane fade" id="signin-2" role="tabpanel" aria-labelledby="signin-tab-2">
                                    <h5 id="errors" class="text-center text-danger  "></h5>



                                    <!-- LOGIN STARTS HERE -->

                                    <form  action="/login" method="post" id="login-form">


                                        <div class="form-group  ">
                                            <label for="email">Email address *</label>
                                            <input type="email" class="form-control" id="email" name="email">
                                        </div><!-- End .form-group -->

                                        <div class="form-group">
                                            <label for="singin-password-2">Password *</label>
                                            <input type="password" class="form-control" id="singin-password-2"
                                                name="password">
                                        </div><!-- End .form-group -->

                                        <div class="form-footer">
                                            <button type="submit" class="btn btn-outline-primary-2">
                                                <span>LOG IN</span>
                                                <i class="icon-long-arrow-right"></i>
                                            </button>



                                            <div class="custom-control custom-checkbox">
                                                <input type="checkbox" class="custom-control-input"
                                                    id="signin-remember-2">
                                                <label class="custom-control-label" for="signin-remember-2">Remember
                                                    Me</label>
                                            </div><!-- End .custom-checkbox -->

                                            <a href="#" class="forgot-link">Forgot Your Password?</a>
                                        </div><!-- End .form-footer -->
                                    </form>



                                    <div>
                                        <% if(typeof invalid!='undefined' ) { %>

                                            <p
                                                style="color: black; text-align: center; background: gray; font-family: Arial, Helvetica, sans-serif;font-weight: bold;">
                                                <%= invalid %>
                                            </p>

                                            <% } %>

                                    </div>



                                    <div>
                                        <% if(typeof is_verified!='undefined' ) { %>

                                            <p
                                                style="color: black; text-align: center; background: gray; font-family: Arial, Helvetica, sans-serif;font-weight: bold;">
                                                <%=is_verified %>
                                            </p>

                                            <% } %>

                                    </div>

                                    <div>
                                        <% if(typeof blockedUser!='undefined' ) { %>

                                            <p
                                                style="color: black; text-align: center; background: gray; font-family: Arial, Helvetica, sans-serif;font-weight: bold;">
                                                <%=blockedUser %>
                                            </p>

                                            <% } %>

                                    </div>


                                    <div id="emailVerificationContainer">
                                        <% if(typeof emailverification!='undefined' ) { %>
                                            <p id="emailVerificationMessage"
                                                style="color: black; text-align: center; background: gray; font-family: Arial, Helvetica, sans-serif;font-weight: bold;">
                                                <%= emailverification %>
                                            </p>
                                            <% } %>
                                    </div>

                                    <script>
                                        // Check if the email verification message exists
                                        var emailVerificationMessage = document.getElementById('emailVerificationMessage');
                                        if (emailVerificationMessage) {
                                            // Set a timer to hide the message after 2 seconds (2000 milliseconds)
                                            setTimeout(function () {
                                                emailVerificationMessage.style.display = 'none';
                                            }, 10000); // 2000 milliseconds = 2 seconds
                                        }
                                    </script>




                                    <div class="form-choice">
                                        <p class="text-center">or sign in with</p>
                                        <div class="row">
                                            <div class="col-sm-6">
                                                <a href="/auth/google" class="btn btn-login btn-g">
                                                    <i class="icon-google"></i>
                                                    Login With Google
                                                </a>
                                            </div><!-- End .col-6 -->
                                            <div class="col-sm-6">
                                                <a href="#" class="btn btn-login btn-f">
                                                    <i class="icon-facebook-f"></i>
                                                    Login With Facebook
                                                </a>
                                            </div><!-- End .col-6 -->
                                        </div><!-- End .row -->
                                    </div><!-- End .form-choice -->
                                </div><!-- .End .tab-pane -->
                                <div class="tab-pane fade show active" id="register-2" role="tabpanel"
                                    aria-labelledby="register-tab-2">


                                    <h5 id="errorsRegister" class="text-center text-danger  "></h5>

                                    <!-- registration 1////////////////////////////////// -->
                                    <form action="/register" method="post" id="register-form">

                                        <div class="form-group">
                                            <label for="user_name">User Name*</label>
                                            <input type="text" class="form-control" id="user_name" name="name">
                                        </div><!-- End .form-group -->

                                        <div class="form-group">
                                            <label for="email">Email address*</label>
                                            <input type="email" class="form-control" id="email" name="email">
                                        </div><!-- End .form-group -->


                                        <div class="form-group">
                                            <label for="mobile">Mobile number*</label>
                                            <input type="number" class="form-control" id="mobile" name="mobile">
                                        </div><!-- End .form-group -->



                                        <div class="form-group">
                                            <label for="password">Password *</label>
                                            <input type="password" class="form-control" id="password" name="password">
                                        </div><!-- End .form-group -->


                                        <div class="form-group">
                                            <label for="password">Confirm Password *</label>
                                            <input type="password" class="form-control" id="password"
                                                name="confirmpassword">
                                        </div><!-- End .form-group -->

                                        <div>
                                            <% if(typeof confirm!='undefined' ) { %>

                                                <p
                                                    style="color: black; text-align: center; background: gray; font-family: Arial, Helvetica, sans-serif;font-weight: bold;">
                                                    <%= confirm %>
                                                </p>

                                                <% } %>

                                        </div>






                                        <div class="form-footer">
                                            <button type="submit" class="btn btn-outline-primary-2">
                                                <span>SIGN UP</span>
                                                <i class="icon-long-arrow-right"></i>
                                            </button>

                                            <div class="custom-control custom-checkbox">
                                                <input type="checkbox" class="custom-control-input"
                                                    id="register-policy-2">
                                                <label class="custom-control-label" for="register-policy-2">I agree to
                                                    the <a href="#">privacy policy</a> *</label>
                                            </div><!-- End .custom-checkbox -->
                                        </div><!-- End .form-footer -->
                                    </form>

                                    <div>
                                        <% if(typeof message!='undefined' ) { %>

                                            <p
                                                style="color: black; text-align: center; background: gray; font-family: Arial, Helvetica, sans-serif;font-weight: bold;">
                                                <%= message %>
                                            </p>

                                            <% } %>

                                    </div>
                                    <% if(typeof passing!='undefined' ) { %>
                                        <p
                                            style="color: black; text-align: center; background: gray; font-family: Arial, Helvetica, sans-serif;font-weight: bold;">
                                            <%= passing %>
                                        </p>

                                        <% } %>

                                            <div>


                                            </div>

                                            <div class="form-choice">
                                                <p class="text-center">or sign in with</p>
                                                <div class="row">
                                                    <div class="col-sm-6">
                                                        <a href="/auth/google" class="btn btn-login btn-g">
                                                            <i class="icon-google"></i>
                                                            Login With Google
                                                        </a>
                                                    </div><!-- End .col-6 -->
                                                    <div class="col-sm-6">
                                                        <a href="" class="btn btn-login  btn-f">
                                                            <i class="icon-facebook-f"></i>
                                                            Login With Facebook
                                                        </a>
                                                    </div><!-- End .col-6 -->
                                                </div><!-- End .row -->
                                            </div><!-- End .form-choice -->
                                </div><!-- .End .tab-pane -->
                            </div><!-- End .tab-content -->
                        </div><!-- End .form-tab -->
                    </div><!-- End .form-box -->
                </div><!-- End .container -->
            </div><!-- End .login-page section-bg -->
        </main><!-- End .main -->

        <footer class="footer">
            <div class="footer-middle">
                <div class="container">
                    <div class="row">
                        <div class="col-sm-6 col-lg-3">
                            <div class="widget widget-about">
                                <img src="assets/images/logo.png" class="footer-logo" alt="Footer Logo" width="105"
                                    height="25">
                                <p>Praesent dapibus, neque id cursus ucibus, tortor neque egestas augue, eu vulputate
                                    magna eros eu erat. </p>

                                <div class="social-icons">
                                    <a href="#" class="social-icon" target="_blank" title="Facebook"><i
                                            class="icon-facebook-f"></i></a>
                                    <a href="#" class="social-icon" target="_blank" title="Twitter"><i
                                            class="icon-twitter"></i></a>
                                    <a href="#" class="social-icon" target="_blank" title="Instagram"><i
                                            class="icon-instagram"></i></a>
                                    <a href="#" class="social-icon" target="_blank" title="Youtube"><i
                                            class="icon-youtube"></i></a>
                                    <a href="#" class="social-icon" target="_blank" title="Pinterest"><i
                                            class="icon-pinterest"></i></a>
                                </div><!-- End .soial-icons -->
                            </div><!-- End .widget about-widget -->
                        </div><!-- End .col-sm-6 col-lg-3 -->

                        <div class="col-sm-6 col-lg-3">
                            <div class="widget">
                                <h4 class="widget-title">Useful Links</h4><!-- End .widget-title -->

                                <ul class="widget-list">
                                    <li><a href="about.html">About Molla</a></li>
                                    <li><a href="#">How to shop on Molla</a></li>
                                    <li><a href="#">FAQ</a></li>
                                    <li><a href="contact.html">Contact us</a></li>
                                    <li><a href="login.html">Log in</a></li>
                                </ul><!-- End .widget-list -->
                            </div><!-- End .widget -->
                        </div><!-- End .col-sm-6 col-lg-3 -->

                        <div class="col-sm-6 col-lg-3">
                            <div class="widget">
                                <h4 class="widget-title">Customer Service</h4><!-- End .widget-title -->

                                <ul class="widget-list">
                                    <li><a href="#">Payment Methods</a></li>
                                    <li><a href="#">Money-back guarantee!</a></li>
                                    <li><a href="#">Returns</a></li>
                                    <li><a href="#">Shipping</a></li>
                                    <li><a href="#">Terms and conditions</a></li>
                                    <li><a href="#">Privacy Policy</a></li>
                                </ul><!-- End .widget-list -->
                            </div><!-- End .widget -->
                        </div><!-- End .col-sm-6 col-lg-3 -->

                        <div class="col-sm-6 col-lg-3">
                            <div class="widget">
                                <h4 class="widget-title">My Account</h4><!-- End .widget-title -->

                                <ul class="widget-list">
                                    <li><a href="#">Sign In</a></li>
                                    <li><a href="cart.html">View Cart</a></li>
                                    <li><a href="#">My Wishlist</a></li>
                                    <li><a href="#">Track My Order</a></li>
                                    <li><a href="#">Help</a></li>
                                </ul><!-- End .widget-list -->
                            </div><!-- End .widget -->
                        </div><!-- End .col-sm-6 col-lg-3 -->
                    </div><!-- End .row -->
                </div><!-- End .container -->
            </div><!-- End .footer-middle -->

            <div class="footer-bottom">
                <div class="container">
                    <p class="footer-copyright">Copyright © 2019 Molla Store. All Rights Reserved.</p>
                    <!-- End .footer-copyright -->
                    <figure class="footer-payments">
                        <img src="assets/images/payments.png" alt="Payment methods" width="272" height="20">
                    </figure><!-- End .footer-payments -->
                </div><!-- End .container -->
            </div><!-- End .footer-bottom -->
        </footer><!-- End .footer -->
    </div><!-- End .page-wrapper -->
    <button id="scroll-top" title="Back to Top"><i class="icon-arrow-up"></i></button>

    <!-- Mobile Menu -->
    <div class="mobile-menu-overlay"></div><!-- End .mobil-menu-overlay -->

    <div class="mobile-menu-container">
        <div class="mobile-menu-wrapper">
            <span class="mobile-menu-close"><i class="icon-close"></i></span>

            <form action="#" method="get" class="mobile-search">
                <label for="mobile-search" class="sr-only">Search</label>
                <input type="search" class="form-control" name="mobile-search" id="mobile-search"
                    placeholder="Search in..." required>
                <button class="btn btn-primary" type="submit"><i class="icon-search"></i></button>
            </form>

            <nav class="mobile-nav">
                <ul class="mobile-menu">



                    <li class="active">
                        <a href="index.html">Home</a>
                    </li>


                    <li>

                        <a href="category.html">Shop</a>

                    </li>


                    <li>

                        <a href="product.html" class="sf-with-ul">Product</a>

                    </li>


                    <li>

                        <a href="#">Pages</a>

                    </li>

            </nav><!-- End .mobile-nav -->

            <div class="social-icons">
                <a href="#" class="social-icon" target="_blank" title="Facebook"><i class="icon-facebook-f"></i></a>
                <a href="#" class="social-icon" target="_blank" title="Twitter"><i class="icon-twitter"></i></a>
                <a href="#" class="social-icon" target="_blank" title="Instagram"><i class="icon-instagram"></i></a>
                <a href="#" class="social-icon" target="_blank" title="Youtube"><i class="icon-youtube"></i></a>
            </div><!-- End .social-icons -->
        </div><!-- End .mobile-menu-wrapper -->
    </div><!-- End .mobile-menu-container -->

    <!-- Sign in / Register Modal -->
    <div class="modal fade" id="signin-modal" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-body">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true"><i class="icon-close"></i></span>
                    </button>






                    <!-- Plugins JS File -->
                    <script src="assets/js/jquery.min.js"></script>
                    <script src="assets/js/bootstrap.bundle.min.js"></script>
                    <script src="assets/js/jquery.hoverIntent.min.js"></script>
                    <script src="assets/js/jquery.waypoints.min.js"></script>
                    <script src="assets/js/superfish.min.js"></script>
                    <script src="assets/js/owl.carousel.min.js"></script>
                    <!-- Main JS File -->
                    <script src="assets/js/main.js"></script>




                    <script>
                        document.addEventListener('DOMContentLoaded', function () {
                            const loginForm = document.querySelector('#login-form');
                            const registerForm = document.querySelector('#register-form');

                            if (loginForm) {
                                loginForm.addEventListener('submit', function (event) {
                                    event.preventDefault();
                                    validateLoginForm(this);
                                });
                            }

                            if (registerForm) {
                                registerForm.addEventListener('submit', function (event) {
                                    event.preventDefault();
                                    validateRegisterForm(this);
                                });
                            }
                        });

                        function validateLoginForm(form) {
                            let errorButton = document.getElementById('errors')
                            const email = form.querySelector('#email').value.trim();
                            const password = form.querySelector('#singin-password-2').value.trim();

                            if (email === '' || password === '') {
                                // alert('Please fill in all required fields.');
                                errorButton.innerHTML = 'Please fill in all required fields.'
                                return;
                            }

                            if (password.length < 8) {
                                errorButton.innerHTML = 'Password must be at least 8 characters long.'
                                return;
                            }

                            // If all validations pass, you can submit the form or perform other actions
                            form.submit(); // Submit the form programmatically
                        }

                        function validateRegisterForm(form) {
                            let errorButton = document.getElementById('errorsRegister')
                            const userName = form.querySelector('#user_name').value.trim();
                            const email = form.querySelector('#email').value.trim();
                            const mobile = form.querySelector('#mobile').value.trim();
                            const password = form.querySelector('#password').value.trim();
                            const policyCheckbox = form.querySelector('#register-policy-2');

                            if (userName === '' || email === '' || mobile === '' || password === '') {
                                errorButton.innerHTML = 'Please fill in all required fields.'
                                return;
                            }

                            if (password.length < 8) {
                                errorButton.innerHTML = 'Password must be at least 8 characters long.'
                                return;
                            }
                            // if (confirmpassword.length < 8 ) {
                            //     alert('Password must be at least 8 characters long.');
                            //     return;
                            // }

                            if (!policyCheckbox.checked) {
                                errorButton.innerHTML = 'Please agree to the privacy policy'
                                return;
                            }

                            // If all validations pass, submit the form programmatically
                            form.submit(); // Submit the form programmatically
                        }
                    </script>












</body>


<!-- molla/login.html  22 Nov 2019 10:04:03 GMT -->

</html>