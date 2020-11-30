"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddItemBar = void 0;
var React = require("react");
var react_1 = require("react");
require("./AddItemBar.css");
var evergreen_ui_1 = require("evergreen-ui");
function AddItemBar(props) {
    var _a = react_1.useState(""), name = _a[0], setName = _a[1];
    var _b = react_1.useState(0), price = _b[0], setPrice = _b[1];
    var _c = react_1.useState(props.categories[0]), category = _c[0], setCategory = _c[1];
    return (React.createElement("div", { className: "add-item-bar" },
        React.createElement("input", { className: "item-name", placeholder: "Item Name", onChange: function (e) {
                setName(e.target.value);
            } }),
        React.createElement("input", { className: "item-price", placeholder: "Price", onChange: function (e) {
                setPrice(Number(e.target.value));
            }, type: "number" }),
        React.createElement("select", { placeholder: "categories", className: "item-categories", name: "categories", id: "categories", defaultValue: "", onChange: function (e) {
                setCategory(e.target.value);
            } }, props.categories.map(function (category) {
            return (React.createElement("option", { value: category, key: category, title: category }, category));
        })),
        React.createElement(evergreen_ui_1.AddIcon, { size: 24, onClick: handleAdd })));
    function handleAdd() {
        var item = {
            "name": name,
            "price": price,
            "category": category,
            "id": 0
        };
        props.handleAdd(item);
    }
}
exports.AddItemBar = AddItemBar;
//# sourceMappingURL=AddItemBar.js.map