
const https = require('https');
var db = {};
// Type 2: Persistent datastore with manual loading
var Datastore = require('nedb')
// db.orderkey = new Datastore({ filename: './database/orderkey.db', autoload: true });
var pendingordersdb = new Datastore({ filename: './database/pendingorders.db', autoload: true });

var transactionsdb = new Datastore({ filename: './database/transactions.db', autoload: true });
var transactionlogsdb = new Datastore({ filename: './database/transactionlogs.db', autoload: true });
var preordersdb = new Datastore({ filename: './database/preorders.db', autoload: true });
var orderkeydb = new Datastore({ filename: './database/orderkey.db', autoload: true });
var productdb = new Datastore({ filename: './database/products.db' });
var customerdb = new Datastore({ filename: './database/customer.db' });
var orderlogsdb = new Datastore({ filename: './database/orderlogs.db', autoload: true });
var customeraddressdb = new Datastore({ filename: './database/customeraddress.db' });
var additionalchargesdb = new Datastore({ filename: './database/additionalcharges.db' });
var discountruledb = new Datastore({ filename: './database/discountrule.db' });
var orderstatusdb = new Datastore({ filename: './database/orderstatus.db' });
var ordertypedb = new Datastore({ filename: './database/ordertype.db' });
var paymentstatusdb = new Datastore({ filename: './database/paymentstatus.db' });
var paymenttypedb = new Datastore({ filename: './database/paymenttype.db' });
var taxgroupdb = new Datastore({ filename: './database/taxgroup.db' });
var transtypedb = new Datastore({ filename: './database/transtype.db' });
var orderdb = new Datastore({ filename: './database/order.db' });
var clientdb = new Datastore({ filename: './database/client.db' });
var masterproductdb = new Datastore({ filename: './database/masterproduct.db' });
var mastercategorydb = new Datastore({ filename: './database/mastercategory.db' });
var masteroptiondb = new Datastore({ filename: './database/masteroption.db' });
var masteroptiongroupdb = new Datastore({ filename: './database/masteroptiongroup.db' });
var unitdb = new Datastore({ filename: './database/unit.db' });
var producttypedb = new Datastore({ filename: './database/producttype.db' });
var vendorsdb = new Datastore({ filename: './database/vendors.db' });
var categoriesdb = new Datastore({ filename: './database/categories.db' });
var barcodeproductdb = new Datastore({ filename: './database/barcodeproduct.db' });
// Master_LOG
var loginfo = new Datastore({ filename: './database/loginfo.db' });
var preferencedb = new Datastore({ filename: './database/preference.db' });
var stockbatchdb = new Datastore({ filename: './database/stockbatch.db' });
// Master
var storeusers = new Datastore({ filename: './database/storeusers.db' });
var user = new Datastore({ filename: './database/user.db' });


function loadatabase() {
    orderkeydb.loadDatabase((data, error) => {
        if (error) {
            console.log("Error loading database!")
        } else {
        }
    })
    productdb.loadDatabase((data, error) => {
        if (error) {
            console.log("Error loading database!")
        } else {
        }
    })
    customerdb.loadDatabase((data, error) => {
        if (error) {
            console.log("Error loading database!")
        } else {
        }
    })
    customeraddressdb.loadDatabase((data, error) => {
        if (error) {
            console.log("Error loading database!")
        } else {
        }
    })
    additionalchargesdb.loadDatabase((data, error) => {
        if (error) {
            console.log("Error loading database!")
        } else {
        }
    })
    discountruledb.loadDatabase((data, error) => {
        if (error) {
            console.log("Error loading database!")
        } else {
        }
    })
    orderstatusdb.loadDatabase((data, error) => {
        if (error) {
            console.log("Error loading database!")
        } else {
        }
    })
    ordertypedb.loadDatabase((data, error) => {
        if (error) {
            console.log("Error loading database!")
        } else {
        }
    })
    paymentstatusdb.loadDatabase((data, error) => {
        if (error) {
            console.log("Error loading database!")
        } else {
        }
    })
    paymenttypedb.loadDatabase((data, error) => {
        if (error) {
            console.log("Error loading database!")
        } else {
        }
    })
    taxgroupdb.loadDatabase((data, error) => {
        if (error) {
            console.log("Error loading database!")
        } else {
        }
    })
    transtypedb.loadDatabase((data, error) => {
        if (error) {
            console.log("Error loading database!")
        } else {
        }
    })
    orderdb.loadDatabase((data, error) => {
        if (error) {
            console.log("Error loading database!")
        } else {

        }
    })
    clientdb.loadDatabase((data, error) => {
        if (error) {
            console.log("Error loading database!")
        } else {

        }
    })
    masterproductdb.loadDatabase((data, error) => {
        if (error) {
            console.log("Error loading database!")
        } else {

        }
    })
    mastercategorydb.loadDatabase((data, error) => {
        if (error) {
            console.log("Error loading database!")
        } else {

        }
    })
    masteroptiondb.loadDatabase((data, error) => {
        if (error) {
            console.log("Error loading database!")
        } else {

        }
    })
    masteroptiongroupdb.loadDatabase((data, error) => {
        if (error) {
            console.log("Error loading database!")
        } else {

        }
    })
    unitdb.loadDatabase((data, error) => {
        if (error) {
            console.log("Error loading database!")
        } else {

        }
    })
    producttypedb.loadDatabase((data, error) => {
        if (error) {
            console.log("Error loading database!")
        } else {

        }
    })
    vendorsdb.loadDatabase((data, error) => {
        if (error) {
            console.log("Error loading database!")
        } else {

        }
    })
    categoriesdb.loadDatabase((data, error) => {
        if (error) {
            console.log("Error loading database!")
        } else {

        }
    })
    barcodeproductdb.loadDatabase((data, error) => {
        if (error) {
            console.log("Error loading database!")
        } else {

        }
    })
    loginfo.loadDatabase((data, error) => {
        if (error) {
            console.log("Error loading database!")
        } else {

        }
    })
    preferencedb.loadDatabase((data, error) => {
        if (error) {
            console.log("Error loading database!")
        } else {

        }
    })
    stockbatchdb.loadDatabase((data, error) => {
        if (error) {
            console.log("Error loading database!")
        } else {

        }
    })
    storeusers.loadDatabase((data, error) => {
        if (error) {
            console.log("Error loading database!")
        } else {

        }
    })
    user.loadDatabase((data, error) => {
        if (error) {
            console.log("Error loading database!")
        } else {

        }
    })
}
loadatabase();
const axios = require('axios')

// axios.get('https://biz1retail.azurewebsites.net/api/Product/getStockProduct?CompanyId=1')
//     .then(res => {
//         console.log(res.data)
//         stockbatchesdb.insert(res.data, function (err, newDoc) {   // Callback is optional
//         });
//     })
//     .catch(error => {
//         console.error(error)
//     })
//     axios.get('https://biz1retail.azurewebsites.net/api/Product/getProductType?CompanyId=1')
//     .then(res => {
//         console.log(res.data)
//         producttypedb.insert(res.data, function (err, newDoc) {   // Callback is optional
//         });
//     })
//     .catch(error => {
//         console.error(error)
//     })
// https.request('https://biz1retail.azurewebsites.net/api/Product/stockEntry?CompanyId=1', { "CompanyId": 1 }, (resp) => {
//     let data = '';

//     // A chunk of data has been recieved.
//     resp.on('data', (chunk) => {
//         data += chunk;
//     });

//     // The whole response has been received. Print out the result.
//     resp.on('end', () => {
//         console.log("qqqq", data)
//         var products = JSON.parse(data).product;
//         stockbatchesdb.insert(products, function (err, newDoc) {   // Callback is optional
//             // newDoc is the newly inserted document, including its _id
//             // newDoc has no key called notToBeSaved since its value was undefined
//             console.log(err, index)
//         });
//     });

// }).on("error", (err) => {
//     console.log("Error: " + err.message);
// });
var express = require('express');
var app = express();
var cors = require('cors')
var ip = require('ip')
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());

app.use(cors());

app.get('/getproducts', function (req, res) {
    productdb.find({ quantity: { $gt: 0 } }, function (err, docs) {
        res.send(docs)
    });
})
app.get('/getbarcodeproduct', function (req, res) {
    barcodeproductdb.find({}, function (err, docs) {
        res.send(docs)
    });
})
app.get('/getcustomers', function (req, res) {
    customerdb.find({}, function (err, docs) {
        res.send(docs)
    });
})
app.get('/getvendors', function (req, res) {
    vendorsdb.find({}, function (err, docs) {
        res.send(docs)
    });
})
app.get('/getcustomerbyphone', function (req, res) {
    customerdb.findOne({ phone: req.query.phone }, function (err, docs) {
        res.send(docs)
    });
})

app.post('/insertcustomer', function (req, res) {
    customerdb.insert(req.body, function (err, docs) {
        res.send(docs)
    });
})
app.post('/insertproduct', function (req, res) {
    productdb.insert(req.body, function (err, docs) {
        res.send(docs)
    });
})

app.post('/batchproduct', function (req, res) {
    productdb.insert(req.body, function (err, newDoc) {   // Callback is optional
        // Callback is optional
        //  console.log(req.body.products)
        res.send({ message: 'data updated successfully' })
    });
})

app.get('/getlocal', function (req, res) {
    var product = req.query.getproducts
    console.log(req.params)
    console.log(req.query)
    res.send(req.query.getproduct)
})

app.get('/join', function (req, res) {
    console.log(req.ip)
    var data = { ip: req.ip }
    clientdb.find(data, function (err, docs) {
        if (docs.length > 0) {
            console.log("Client already exists!")
            data.message = "Client already exists!"
            res.send(data);
        } else {
            console.log("new client!")
            clientdb.insert(data, function (err, newDoc) {
                console.log(err, newDoc)
                data.message = "Successfully joined server!"
                app.emit('new_client', req.ip)
                res.send(data);
            });
        }
    })
    // res.send({ ip: req.ip })
})

app.get('/getclients', function (req, res) {
    var responsedata = {
        msg: '',
        clients: []
    };
    clientdb.find({}, function (err, docs) {
        if (err) {
            responsedata.msg = 'Failed to fetch Client list';
            res.send(responsedata)
        } else {
            responsedata.msg = 'Client list successfully fetched';
            responsedata.clients = docs;
            res.send(responsedata)
        }
    })
})
app.post('/addbarcodeproduct', function (req, res) {
    // console.dir(req.body);
    barcodeproductdb.insert(req.body, function (err, newDoc) {   // Callback is optional
        res.send({ message: 'yes iam the server' })
    });
})

app.get('/checkifserver', function (req, res) {
    res.send({ message: 'yes iam the server' })
})

app.post('/addmasterproduct', function (req, res) {
    console.dir(req.body);
    masterproductdb.insert(req.body, function (err, newDoc) {   // Callback is optional
        res.send({ message: 'yes iam the server' })
    });

})
app.post('/updatemasterproduct', function (req, res) {
    console.dir(req.body);
    masterproductdb.update({ _id: req.body._id }, req.body, { upsert: true }, function (err, newDoc) {
        console.log(req.body) // Callback is optional
        res.send({ message: 'yes iam the server' })
    });
})
app.post('/addmasteroption', function (req, res) {
    console.dir(req.body);
    masteroptiondb.insert(req.body, function (err, newDoc) {   // Callback is optional
    });
    res.send({ message: 'yes iam the server' })
})
app.post('/updatemasteroption', function (req, res) {
    console.dir(req.body);
    masteroptiondb.update({ _id: req.body._id }, req.body, { upsert: true }, function (err, newDoc) {
        console.log(newDoc) // Callback is optional
        res.send({ message: 'yes iam the server' })
    });
})
app.post('/updatemasteroptiongroup', function (req, res) {
    console.dir(req.body);
    masteroptiongroupdb.update({ _id: req.body._id }, req.body, { upsert: true }, function (err, newDoc) {
        console.log(newDoc) // Callback is optional
        res.send({ message: 'yes iam the server' })
    });
})
app.post('/addmasteroptiongroup', function (req, res) {
    console.dir(req.body);
    masteroptiongroupdb.insert(req.body, function (err, newDoc) {   // Callback is optional
    });
    res.send({ message: 'yes iam the server' })
})
app.get('/masteroption', function (req, res) {
    console.dir(req.body);
    masteroptiondb.find({}, function (err, newDoc) {   // Callback is optional
        res.send(newDoc)
    });
})
app.get('/masteroptiongroup', function (req, res) {
    console.dir(req.body);
    masteroptiongroupdb.find({}, function (err, newDoc) {   // Callback is optional
        res.send(newDoc)
    });
})
app.get('/getmasterproduct', function (req, res) {
    masterproductdb.find({}, function (err, data) {   // Callback is optional
        res.send(data)
    });
})
app.get('/getmastercategory', function (req, res) {
    console.dir(req.body);
    mastercategorydb.find({}, function (err, newDoc) {
        res.send(newDoc)
    });
})
app.get('/gettaxgroup', function (req, res) {
    console.dir(req.body);
    taxgroupdb.find({}, function (err, newDoc) {
        res.send(newDoc)
    });
})
app.get('/getunit', function (req, res) {
    console.dir(req.body);
    unitdb.find({}, function (err, newDoc) {
        res.send(newDoc)
    });
})
app.get('/getproducttype', function (req, res) {
    console.dir(req.body);
    producttypedb.find({}, function (err, newDoc) {
        res.send(newDoc)
    });
})
app.get('/getproductbyid', function (req, res) {
    console.log(req.body, req.query.id, { _id: req.query.id });
    masterproductdb.findOne({ _id: req.query.id }, function (err, newDoc) {
        res.send(newDoc)
    });
})
app.get('/updatemasterproduct', function (req, res) {
    masterproductdb.remove({}, { multi: true }, function (err, newDoc) {
        axios.get('https://biz1retail.azurewebsites.net/api/Product/getmasterproducts?CompanyId=1')
            .then(response => {
                console.log(response.data)
                masterproductdb.insert(response.data, function (err, newDoc) {   // Callback is optional
                    var obj = { status: 200, message: "masterproduct db reset success" }
                    res.send(obj)
                });
            })
            .catch(error => {
                var obj = { status: 500, message: "masterproduct db reset failed", error: error }
                res.send(obj)
            })

    });
})


app.get('/getorderlogs', function (req, res) {
    orderlogsdb.find({}, function (err1, logs) {   // Callback is optional
        res.send(logs)
    })
});

app.post('/saveorderdb', function (req, res) {
    var i = 0
    orderdb.insert(req.body.order, function (err, newDoc) {
        i++ // Callback is optional
        if (i == 1)
            res.send({ message: 'data updated successfully' })
    });
    // productdb.insert(req.body.products, function (err, newDoc) {   // Callback is optional
    //     i++ // Callback is optional
    //     if (i == 2)
    //         res.send({ message: 'data updated successfully' })
    // });
    if (req.body.order.OrderType == 6) {
        req.body.order.Items.forEach(item => {
            productdb.findOne({ _id: item._id }, function (err, newDoc) {
                newDoc.quantity -= item.OrderQuantity
                console.log(newDoc.quantity, item.OrderQuantity)
                productdb.update({ _id: newDoc._id }, newDoc, { upsert: false }, function (err, docs) {
                    console.log(docs)
                });
            });
        });
    }
})

// app.post('/addtaxgroup', function (req, res) {
//     console.dir(req.body);
//     taxgroupdb.insert(req.body, function (err, newDoc) {   // Callback is optional
//         res.send({ message: 'yes iam the server' })
//     });
// })
// app.post('/updatetaxgroup', function (req, res) {
//     console.dir(req.body);
//     taxgroupdb.update(req.body, function (err, newDoc) {   // Callback is optional
//         res.send({ message: 'yes iam the server' })
//     });
// })
app.post('/updatetaxgroup', function (req, res) {
    console.dir(req.body);
    taxgroupdb.update({ _id: req.body._id }, req.body, { upsert: true }, function (err, newDoc) {
        console.log(newDoc) // Callback is optional
        res.send({ message: 'yes iam the server' })
    });
})
app.post('/updatevariantgroup', function (req, res) {
    console.dir(req.body);
    masteroptiongroupdb.update({ _id: req.body._id }, req.body, { upsert: true }, function (err, newDoc) {
        console.log(newDoc) // Callback is optional
        res.send({ message: 'yes iam the server' })
    });
})
app.post('/updatevariant', function (req, res) {
    console.dir(req.body);
    masteroptiondb.update({ _id: req.body._id }, req.body, { upsert: true }, function (err, newDoc) {
        console.log(newDoc) // Callback is optional
        res.send({ message: 'yes iam the server' })
    });
})
app.post('/updatecategories', function (req, res) {
    console.dir(req.body);
    categoriesdb.update({ _id: req.body._id }, req.body, { upsert: true }, function (err, newDoc) {
        console.log(newDoc) // Callback is optional
        res.send({ message: 'yes iam the server' })
    });
})
app.post('/updatemasterproduct', function (req, res) {
    console.dir(req.body);
    masterproduct.update({ _id: req.body._id }, req.body, { upsert: true }, function (err, newDoc) {
        console.log(newDoc) // Callback is optional
        res.send({ message: 'yes iam the server' })
    });
})

app.post('/syncproducts', function (req, res) {
    console.dir(req.body);
    productdb.insert(req.body, function (err, newDoc) {   // Callback is optional
        res.send({ message: 'yes iam the server' })
    });
})
// app.get('/getorders', function (req, res) {
//     console.dir(req.body);
//     orderdb.find({ OrderType: +req.query.typeid }, function (err1, docs) {   // Callback is optional
//         res.send(docs)
//     })
// })
app.get('/getorders', function (req, res) {
    console.log(req.ip, req.hostname)
    orderdb.find({ status: "N" }, function (err1, docs) {   // Callback is optional
        res.send(docs)
    })
});
app.post('/saveorder', function (req, res) {
    console.log(req.ip, req.hostname)
    req.body.status = "N"
    orderdb.insert(req.body, function (err1, newDoc) {   // Callback is optional
        res.send({ msg: "success" })
    })
});

app.post('/updateorder', function (req, res) {
    orderdb.update({ _id: req.body._id }, req.body, function (err1, newDoc) {   // Callback is optional
        transactionsdb.remove({ InvoiceNo: req.body.InvoiceNo }, { multi: true }, function (err, num) {
        })
        res.send({ msg: "success" })
    })
});

app.post('/deleteorder', function (req, res) {
    console.log(req.query)
    var i = 0
    orderdb.remove({ _id: req.query._id }, function (err1, newDoc) {   // Callback is optional.
        i++
        if (i == 2) res.send({ msg: "success" })
    })
    stockbatchdb.insert(req.body, function (err1, newDoc) {
        i++
        if (i == 2) res.send({ msg: "success" })
    })
});

app.post('/updatepreference', function (req, res) {
    console.dir(req.body);
    preferencedb.update({ companyId: req.body.companyId }, req.body, { upsert: true }, function (err, newDoc) {
        console.log(newDoc) // Callback is optional
        res.send({ message: 'yes iam the server' })
    });
})

app.post('/saveStockBatch', function (req, res) {
    console.log("qwerty", req.body)
    if (req.body) {
        // stockbatchdb.insert(req.body, function (err, newDoc) {
        var i = 0
        taxgroupdb.find({}, function (err, docs) {
            req.body.forEach(sb => {
                stockbatchdb.update({ stockBatchId: sb.stockBatchId }, sb, { upsert: true }, function (sberr, sbch) {
                    var products = []
                    var obj = {
                        "product": sb.productName,
                        "barcodeId": sb.batch.barcodeId,
                        "productId": sb.batch.productId,
                        "barCode": sb.batch.barCode,
                        "price": sb.batch.price,
                        "tax1": docs.filter(x => x.id == sb.batch.product.taxGroupId)[0].tax1,
                        "tax2": docs.filter(x => x.id == sb.batch.product.taxGroupId)[0].tax2,
                        "tax3": docs.filter(x => x.id == sb.batch.product.taxGroupId)[0].tax3,
                        "isInclusive": docs.filter(x => x.id == sb.batch.product.taxGroupId)[0].isInclusive,
                        "stockBatchId": sb.stockBatchId,
                        "quantity": sb.quantity,
                        "createdDate": sb.createdDate
                    }
                    productdb.update({ stockBatchId: sb.stockBatchId }, obj, { upsert: true }, function (perr, prdt) {
                        i++
                        if (i == req.body.length) res.send({ msg: "success" })
                    })
                    products.push(obj)
                })
            })
        })
        // });
    } else {
        res.send({ msg: "empty or invalid payload" })
    }
})
// app.get('/getpurchaseorders', function (req, res) {
//     console.log(req.ip, req.hostname)
//     orderdb.find({ OrderType: +req.query.typeid }, function (err1, docs) {   // Callback is optional
//         res.send(docs)
//     })
// });
app.post('/updatepurchaseorder', function (req, res) {
    orderdb.update({ _id: req.body._id }, req.body, function (err1, newDoc) {   // Callback is optional
        console.log(err1, newDoc, req.body._id, req.body.status)
        res.send({ msg: "success" })
    })
});
app.post('/updatevendors', function (req, res) {
    console.dir(req.body);
    vendorsdb.update({ _id: req.body._id }, req.body, { upsert: true }, function (err, newDoc) {
        console.log(newDoc) // Callback is optional
        res.send({ message: 'yes iam the server' })
    });
})
// app.post('/addcategories', function (req, res) {
//     console.dir(req.body);
//     categoriesdb.insert(req.body, function (err, newDoc) {   // Callback is optional
//     });
//     res.send({ message: 'yes iam the server' })
// })

app.get('/getpreference', function (req, res) {
    preferencedb.find({}, function (err, docs) {
        res.send(docs)
    });
})

function updateproductdb(product_list) {
    console.log(product_list)
    masterproductdb.remove({}, { multi: true }, function (err, num) {
        console.log("db clean", err, num)
        masterproductdb.insert(product_list, function (err, newDoc) {   // Callback is optional
            var obj = { status: 200, message: "masterproduct db reset success" }
        });
    })
}
function updatevariantdb(variant_list) {
    console.log(variant_list)
    masteroptiondb.remove({}, { multi: true }, function (err, num) {
        console.log("db clean", err, num)
        masteroptiondb.insert(variant_list, function (err, newDoc) {   // Callback is optional
            var obj = { status: 200, message: "masteroption db reset success" }
        });
    })
}
function updatevariantgroupdb(variantgroup_list) {
    console.log(variantgroup_list)
    masteroptiongroupdb.remove({}, { multi: true }, function (err, num) {
        console.log("db clean", err, num)
        masteroptiongroupdb.insert(variantgroup_list, function (err, newDoc) {   // Callback is optional
            var obj = { status: 200, message: "masterproduct db reset success" }
        });
    })
}
// app.get('/updatevariantgroup', function (req, res) {
//     masteroptiongroupdb.remove({}, { multi: true }, function (err, newDoc) {
//         axios.get('https://biz1retail.azurewebsites.net/api/Product/getvariantgroups?CompanyId=1')
//             .then(response => {
//                 console.log(response.data)
//                 masteroptiongroupdb.insert(response.data, function (err, newDoc) {   // Callback is optional
//                     var obj = { status: 200, message: "optiongroup db reset success" }
//                     res.send(obj)
//                     // loadatabase();
//                 });
//             })
//             .catch(error => {
//                 var obj = { status: 500, message: "optiongroup db reset failed", error: error }
//                 res.send(obj)
//                 // loadatabase();
//             })

//     });
// })
app.get('/updatevariant', function (req, res) {
    masteroptiondb.remove({}, { multi: true }, function (err, newDoc) {
        axios.get('https://biz1retail.azurewebsites.net/api/Product/getvariants?CompanyId=1')
            .then(response => {
                console.log(`statusCode: ${response.statusCode}`)
                masteroptiondb.insert(response.data, function (err, newDoc) {   // Callback is optional
                    console.log("db updated");
                    var obj = { status: 200, message: "option db reset success" }
                    res.send(obj)
                });
            })
            .catch(error => {
                var obj = { status: 500, message: "option db reset failed", error: error }
                res.send(obj)
            })

    });
})
app.post('/addcustomer', function (req, res) {
    customerdb.update({ phoneNo: req.body.phoneNo }, req.body, { upsert: true }, function (err, newDoc) {   // Callback is optional
        console.log("db updated");
        var obj = { status: 200, message: "customer db reset success" }
        res.send(obj)
    });
})
app.post('/setorderkey', function (req, res) {
    orderkeydb.update({ _id: req.body._id }, req.body, { upsert: true }, function (err, newdoc) {
        var obj = { status: 200, msg: "data added succesfully" }
        res.send(obj)
    });
});

// customerdb.remove({}, { multi: true }, function (err, newDoc) {
//         axios.get('https://biz1retail.azurewebsites.net/api/Customer/GetCustomerList?CompanyId=1')
//             .then(response => {
//                 console.log(`statusCode: ${response.statusCode}`)
//                 customerdb.insert(response.data, function (err, newDoc) {   // Callback is optional
//                     console.log("db updated");
//                     var obj = { status: 200, message: "option db reset success" }
//                     res.send(obj)
//                 });
//             })
//             .catch(error => {
//                 var obj = { status: 500, message: "option db reset failed", error: error }
//                 res.send(obj)
//             })

//     });

app.post('/updatecustomer', function (req, res) {
    console.dir(req.body);
    customerdb.update({ _id: req.body._id }, req.body, { upsert: true }, function (err, newDoc) {
        console.log(newDoc) // Callback is optional
        res.send({ message: 'yes iam the server' })
    });
});


app.get('/syncdata', function (req, response) {
    var actioncount = 6;
    var currentcount = 0;
    var obj = { status: 200, message: "Success" }
    masterproductdb.find({}, function (err, data) {
        if (err) return;
        var dbdata = data;
        var adddata = dbdata.filter(x => x.action == "A");
        var udata = dbdata.filter(x => x.action == "U");
        console.log(adddata.length, udata.length)
        if (adddata.length > 0) {
            axios
                .post('https://biz1retail.azurewebsites.net/api/Product/bulkaddproduct', adddata)
                .then(res => {
                    // console.log(res)
                    currentcount++;
                    if (res.data.status == 200) {
                        updateproductdb(res.data.product_list)
                    }
                    if (currentcount == actioncount) response.send(obj);
                })
                .catch(error => {
                    console.error(error)
                    currentcount++;
                    if (currentcount == actioncount) response.send(obj);
                })
        } else {
            currentcount++;
            if (currentcount == actioncount) response.send(obj);
        }
        if (udata.length > 0) {
            axios
                .post('https://biz1retail.azurewebsites.net/api/Product/bulkupdateproduct', udata)
                .then(res => {
                    console.log(`statusCode: ${res.statusCode}`)
                    currentcount++;
                    if (res.data.status == 200) {
                        updateproductdb(res.data.product_list)
                    }
                    if (currentcount == actioncount) response.send(obj);
                })
                .catch(error => {
                    console.error(error)
                    currentcount++;
                    if (currentcount == actioncount) response.send(obj);
                })
        } else {
            currentcount++;
            if (currentcount == actioncount) response.send(obj);
        }

    })
    // masteroptiondb.find({}, function (err, data) {
    //     if (err) return;
    //     var dbdata = data;
    //     var adddata = dbdata.filter(x => x.action == "A");
    //     var udata = dbdata.filter(x => x.action == "U");
    //     console.log(adddata.length, udata.length)
    //     if (adddata.length > 0) {
    //         axios
    //             .post('https://biz1retail.azurewebsites.net/api/Product/bulkaddoption', adddata)
    //             .then(res => {
    //                 console.log(res.data)
    //                 currentcount++;
    //                 if (res.data.status == 200) {
    //                     updatevariantdb(res.data.variant_list)
    //                 }
    //                 if (currentcount == actioncount) response.send(obj);
    //             })
    //             .catch(error => {
    //                 console.error(error)
    //                 currentcount++;
    //                 if (currentcount == actioncount) response.send(obj);
    //             })
    //     } else {
    //         currentcount++;
    //         if (currentcount == actioncount) response.send(obj);
    //     }
    //     if (udata.length > 0) {
    //         axios
    //             .post('https://biz1retail.azurewebsites.net/api/Product/bulkupdateoption', udata)
    //             .then(res => {
    //                 console.log(res)
    //                 currentcount++;
    //                 if (res.data.status == 200) {
    //                     updatevariantdb(res.data.variant_list)
    //                 }
    //                 if (currentcount == actioncount) response.send(obj);
    //             })
    //             .catch(error => {
    //                 console.error(error)
    //                 currentcount++;
    //                 if (currentcount == actioncount) response.send(obj);
    //             })
    //     }
    //     else {
    //         currentcount++;
    //         if (currentcount == actioncount) response.send(obj);
    //     }

    // })
    masteroptiongroupdb.find({}, function (err, data) {
        if (err) return;
        var dbdata = data;
        var adddata = dbdata.filter(x => x.action == "A");
        var udata = dbdata.filter(x => x.action == "U");
        if (adddata.length > 0) {
            console.log(adddata)
            axios
                .post('https://biz1retail.azurewebsites.net/api/Product/bulkaddoptiongroup', adddata)
                .then(res => {
                    console.log(res.data)
                    currentcount++;
                    if (res.data.status == 200) {
                        updatevariantgroupdb(res.data.variantgroup_list)
                    }
                    if (currentcount == actioncount) response.send(obj);
                })
                .catch(error => {
                    console.error(error)
                    currentcount++;
                    if (currentcount == actioncount) response.send(obj);
                })
        }
        else {
            currentcount++;
            if (currentcount == actioncount) response.send(obj);
        }

        if (udata.length > 0) {
            axios
                .post('https://biz1retail.azurewebsites.net/api/Product/bulkupdateoptiongroup', udata)
                .then(res => {
                    console.log()
                    currentcount++;
                    if (res.data.status == 200) {
                        updatevariantgroupdb(res.data.variantgroup_list)
                    }
                    if (currentcount == actioncount) response.send(obj);
                })
                .catch(error => {
                    console.error(error)
                    currentcount++;
                    if (currentcount == actioncount) response.send(obj);
                })
        } else {
            currentcount++;
            if (currentcount == actioncount) response.send(obj);
        }


    })
})

// pre save order
app.get('/getpreorders', function (req, res) {
    preordersdb.find({ status: "P" }, function (err1, docs) {   // Callback is optional
        console.log('Line: 195', err1)
        res.send(docs)
    })
});
app.post('/updatepreorder', function (req, res) {
    preordersdb.update({ _id: req.body._id }, req.body, function (err1, newDoc) {   // Callback is optional
        console.log("Line: 218", err1, newDoc, req.body._id, req.body.status)
        if (req.body.status == "S")
            transactionsdb.remove({ InvoiceNo: req.body.InvoiceNo }, { multi: true }, function (err, num) { })

        // db.transactions.update({ InvoiceNo: req.body.InvoiceNo }, { $set: { "saved": true } }, { multi: true }, function (err, num) { })
        res.send({ msg: "success" })
    })
});
app.get('/transactionsbyinvoice', function (req, res) {
    transactionsdb.find({ InvoiceNo: req.query.InvoiceNo }, function (err, trnxns) {
        res.send(trnxns)
    })
});
app.post('/addtransaction', function (req, res) {
    db.transactions.insert(req.body, function (err, trnxns) {
        res.send({ message: "Transaxn save success" })
    })
});

app.post('/logorderevent', function (req, res) {
    orderlogsdb.insert(req.body, function (err1, newDoc) {   // Callback is optional
        if (err1) {
            error_log(req.body, err1)
        }
        res.send({ msg: "success" })
    })
});
app.post('/logtransactions', function (req, res) {
    transactionlogsdb.insert(req.body, function (err1, newDoc) {   // Callback is optional
        res.send({ msg: "success" })
    })
});

app.post('/getdbdata', function (req, res) {
    var data = {}
    var i = 0
    var j = req.body.length
    req.body.forEach(dbname => {
        db[dbname].find({}, function (err, docs) {
            // console.log(dbname, docs.length)
            data[dbname] = docs
            i++
            if (i == j) res.send(data)
        });
    })
});

app.post('/savepreorder', function (req, res) {
    console.log(req.ip, req.hostname)
    req.body.status = "P"
    preordersdb.insert(req.body, function (err1, newDoc) {   // Callback is optional
        console.log('Line: 188', err1)
        res.send({ msg: "success" })
    })
});


app.get('/getloginfo', function (req, res) {
    loginfo.findOne({}, function (err, doc) {
        res.send(doc)
    })
})
app.post('/setstoredata', function (req, res) {
    var i = 0
    var obj = { mas: "success" }
    loginfo.remove({}, { multi: true }, function (err, numberRemoved) {
        loginfo.insert(req.body.logInfo, function (err, newDoc) {   // Callback is optional
            console.log("loginfo", i)
            i++
            if (i == 11)
                res.send(obj)
        });
    })
    customerdb.remove({}, { multi: true }, function (err, numRemoved) {
        // numRemoved = 1
        customerdb.insert(req.body.customer, function (err, newDoc) {   // Callback is optional
            console.log("customerdb", i)
            i++
            if (i == 11)
                res.send(obj)
        });
    });
    productdb.remove({}, { multi: true }, function (err, numRemoved) {
        productdb.insert(req.body.product, function (err, newDoc) {   // Callback is optional
            console.log("productdb", i)
            i++
            if (i == 11)
                res.send(obj)
        });
    });
    barcodeproductdb.remove({}, { multi: true }, function (err, numRemoved) {
        barcodeproductdb.insert(req.body.barcodeProduct, function (err, newDoc) {   // Callback is optional
            console.log("barcodeproductdb", i)
            i++
            if (i == 11)
                res.send(obj)
        });
    });
    vendorsdb.remove({}, { multi: true }, function (err, numRemoved) {
        vendorsdb.insert(req.body.vendor, function (err, newDoc) {   // Callback is optional
            console.log("vendorsdb", i)
            i++
            if (i == 11)
                res.send(obj)
        });
    });
    categoriesdb.remove({}, { multi: true }, function (err, numRemoved) {
        categoriesdb.insert(req.body.categories, function (err, newDoc) {   // Callback is optional
            console.log("categoriesdb", i)
            i++
            if (i == 11)
                res.send(obj)
        });
    });
    taxgroupdb.remove({}, { multi: true }, function (err, numRemoved) {
        taxgroupdb.insert(req.body.taxGroup, function (err, newDoc) {   // Callback is optional
            console.log("taxgroupdb", i)
            i++
            if (i == 11)
                res.send(obj)
        });
    });
    masteroptiongroupdb.remove({}, { multi: true }, function (err, numRemoved) {
        masteroptiongroupdb.insert(req.body.variantGroup, function (err, newDoc) {   // Callback is optional
            console.log("variantGroup", i)
            i++
            if (i == 11)
                res.send(obj)
        });
    });
    masteroptiondb.remove({}, { multi: true }, function (err, numRemoved) {
        masteroptiondb.insert(req.body.variant, function (err, newDoc) {   // Callback is optional
            console.log("variant", i)
            i++
            if (i == 11)
                res.send(obj)
        });
    });
    masterproductdb.remove({}, { multi: true }, function (err, numRemoved) {
        masterproductdb.insert(req.body.masterproduct, function (err, newDoc) {   // Callback is optional
            console.log("masterproduct", i)
            i++
            if (i == 11)
                res.send(obj)
        });
    });
    preferencedb.remove({}, { multi: true }, function (err, numRemoved) {
        preferencedb.insert(req.body.preference, function (err, newDoc) {   // Callback is optional
            console.log("preference", i)
            i++
            if (i == 11)
                res.send(obj)
        });
    });

});

// app.post('/addmasterproduct', function (req, res) {
//     console.dir(req.body);
//     masterproductdb.insert(req.body, function (err, newDoc) {   // Callback is optional
//                     });
//     res.send({ message: 'yes iam the server' })
// })
// app.post('/addmasterproduct', function (req, res) {
//     console.dir(req.body);
//     masterproductdb.insert(req.body, function (err, newDoc) {   // Callback is optional
//                     });
//     res.send({ message: 'yes iam the server' })
// })
function removeclient(id) {
    clientdb.remove({ _id: id }, {}, function (err, numRemoved) {
        // numRemoved = 1
    });
}
function stopserver() {
    app.removeAllListeners();
    server.close();
    server.once('close', () => console.log('Server stopped'));

}
// var server = app.listen(8081, ip.address(), function () {
//     var host = server.address().address
//     var port = server.address().port
//     console.log("Example app listening at http://%s:%s", host, port)
// })

var server;

function startServer() {
    app.on('getserverip', (data) => {
        console.log(server)
        app.emit('appstarted', server.address())
    })
    server = app.listen(8081, function () {
        var host = server.address().address
        var port = server.address().port
        console.log("Example app listening at http://%s:%s", host, port)
        app.emit('appstarted', server.address())
    })
}
startServer();
// app.listen = function () {
//     var server = http.createServer(this);
//     return server.listen.apply(server, arguments);
// };
// startServer();

module.exports = {
    startserver() {
        return startServer();
    },
    app,
    removeclient(id) {
        return removeclient(id)
    },
    stopserver() {
        return stopserver()
    }
}
