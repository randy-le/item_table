"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemTable = void 0;
var React = require("react");
var react_1 = require("react");
var AddItemBar_1 = require("./AddItemBar");
require("./ItemTable.css");
var ag_grid_react_1 = require("ag-grid-react");
require("ag-grid-community/dist/styles/ag-grid.css");
require("ag-grid-community/dist/styles/ag-theme-alpine.css");
function ItemTable() {
    var _a = react_1.useState([]), rows = _a[0], setRows = _a[1];
    var _b = react_1.useState({}), bottomRow = _b[0], setBottomRow = _b[1];
    var categories = ["Los Angeles Lakers", "Portland Trailblazers", "Phoenix Suns"];
    // initial fetch of data
    react_1.useEffect(function () {
        getItems();
    }, []);
    return (React.createElement("div", { className: "ag-theme-alpine grid-div", style: { height: 500, width: 393 } },
        React.createElement(ag_grid_react_1.AgGridReact, { rowData: rows, gridOptions: {
                rowClassRules: { 'category-header': 'data.header === 1', 'total-price': 'data.totalPrice === 1' }
            }, pinnedBottomRowData: [bottomRow] },
            React.createElement(ag_grid_react_1.AgGridColumn, { field: "name" }),
            React.createElement(ag_grid_react_1.AgGridColumn, { field: "price", width: 125 }),
            React.createElement(ag_grid_react_1.AgGridColumn, { headerName: "", field: "id", cellRendererFramework: function (params) { return deleteCellRenderer(params); }, width: 50 })),
        React.createElement(AddItemBar_1.AddItemBar, { handleAdd: addItem, categories: categories })));
    /**
     * Updates the rows to be displayed.
     *  Sorts items based on categories
     *  Totals the price of all items of a category
     *  Inserts category headers
     *  Adds total price to footer
     */
    function calculateRows(data) {
        // find unique categories
        var categories = new Set();
        for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
            var item = data_1[_i];
            categories.add(item.category);
        }
        // sort the categories
        var sortedCategories = Array.from(categories.values()).sort();
        // for each category, group their respective items
        var displayRows = [];
        var totalPrice = 0;
        sortedCategories.map(function (category) {
            var categoryTotal = 0; // total price of all items in the category
            var rows = [];
            for (var _i = 0, data_2 = data; _i < data_2.length; _i++) {
                var item = data_2[_i];
                if (item.category === category) {
                    // don't mutate original data, append $ to price
                    var tempItem = __assign({}, item);
                    tempItem.price = "$" + item.price.toString();
                    rows.push(tempItem);
                    categoryTotal += item.price;
                }
            }
            // add category header to the top of the rows
            rows.unshift({ name: category, price: "$" + categoryTotal, header: 1 });
            // add to rows to be displayed
            displayRows = displayRows.concat(rows);
            // add category total to total price
            totalPrice += categoryTotal;
        });
        // update the table with all rows
        setRows(displayRows);
        // set bottom row as total price
        setBottomRow({ name: "TOTAL", price: "$" + totalPrice, totalPrice: 1 });
    }
    // api call to fetch items
    function getItems() {
        return __awaiter(this, void 0, void 0, function () {
            var response, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fetch('items')];
                    case 1:
                        response = _a.sent();
                        return [4 /*yield*/, response.json()];
                    case 2:
                        data = _a.sent();
                        calculateRows(data);
                        return [2 /*return*/];
                }
            });
        });
    }
    // api call to add an item
    function addItem(item) {
        return __awaiter(this, void 0, void 0, function () {
            var response, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fetch('items', {
                            method: "post",
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(item)
                        })];
                    case 1:
                        response = _a.sent();
                        return [4 /*yield*/, response.json()];
                    case 2:
                        data = _a.sent();
                        calculateRows(data);
                        return [2 /*return*/];
                }
            });
        });
    }
    // api call to delete an item
    function deleteItem(id) {
        return __awaiter(this, void 0, void 0, function () {
            var response, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fetch("items/" + id, { method: "post" })];
                    case 1:
                        response = _a.sent();
                        return [4 /*yield*/, response.json()];
                    case 2:
                        data = _a.sent();
                        calculateRows(data);
                        return [2 /*return*/];
                }
            });
        });
    }
    // helper function to tell the grid how to render the delete cell row
    function deleteCellRenderer(params) {
        if (params.data.header !== 1 && params.data.totalPrice !== 1) {
            return (React.createElement("i", { className: "fa fa-trash", style: { fontSize: "20px", cursor: "pointer" }, onClick: function () { return deleteItem(params.data.id); } }));
        }
        else {
            return "";
        }
    }
}
exports.ItemTable = ItemTable;
//# sourceMappingURL=ItemTable.js.map