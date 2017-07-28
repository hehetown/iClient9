﻿/*
 * Class: SuperMap.ThemeUniqueItem
 * 单值专题图子项类。
 * 单值专题图是将专题值相同的要素归为一类，为每一类设定一种渲染风格，其中每一类就是一个专题图子项。比如，利用单值专题图制作行政区划图，Name 字段代表
 * 省/直辖市名，该字段用来做专题变量，如果该字段的字段值总共有5种不同值，则该行政区划图有5个专题图子项。
 */
var SuperMap = require('../SuperMap');
var ServerStyle = require('./ServerStyle');

/**
 * @class SuperMap.ThemeUniqueItem
 * @description 单值专题图子项类。<br>
 *              单值专题图是将专题值相同的要素归为一类，为每一类设定一种渲染风格，其中每一类就是一个专题图子项。比如，利用单值专题图制作行政区划图，Name 字段代表
 *              省/直辖市名，该字段用来做专题变量，如果该字段的字段值总共有5种不同值，则该行政区划图有5个专题图子项。
 * @param options - {Object} 可选参数。如：<br>
 *        caption - {String} 单值专题图子项的标题。
 *        style - {SuperMap.ServerStyle} 单值专题图子项的风格。
 *        unique - {String} 单值专题图子项的单值。
 *        visible - {Boolean} 单值专题图子项是否可见。
 */
SuperMap.ThemeUniqueItem = SuperMap.Class({

    /**
     * APIProperty: caption
     * @member SuperMap.ThemeUniqueItem.prototype.caption -{String}
     * @description 单值专题图子项的标题。
     */
    caption: null,

    /**
     * APIProperty: style
     * @member SuperMap.ThemeUniqueItem.prototype.style -{SuperMap.ServerStyle}
     * @description 单值专题图子项的显示风格。
     */
    style: null,

    /**
     * APIProperty: unique
     * @member SuperMap.ThemeUniqueItem.prototype.unique -{String}
     * @description 单值专题图子项的值，可以为数字、字符串等。
     */
    unique: null,

    /**
     * APIProperty: visible
     * @member SuperMap.ThemeUniqueItem.prototype.visible -{Boolean}
     * @description 单值专题图子项的可见性。默认为 true，表示可见。
     */
    visible: true,

    /*
     * Constructor: SuperMap.ThemeUniqueItem
     * 单值专题图子项类构造函数。
     */
    initialize: function (options) {
        var me = this;
        me.style = new ServerStyle();
        if (options) {
            SuperMap.Util.extend(this, options);
        }
    },

    /**
     * APIMethod: destroy
     * @function destroy
     * @description 释放资源，将引用资源的属性置空。
     */
    destroy: function () {
        var me = this;
        me.caption = null;
        me.unique = null;

        if (me.style) {
            me.style.destroy();
            me.style = null;
        }
        me.visible = null;
    },

    /*
     * Method: toServerJSONObject
     * 转换成对应的 JSON 格式对象。
     */
    toServerJSONObject: function () {
        var obj = {};
        obj = SuperMap.Util.copyAttributes(obj, this);
        if (obj.style) {
            if (obj.style.toServerJSONObject) {
                obj.style = obj.style.toServerJSONObject();
            }
        }
        return obj;
    },

    CLASS_NAME: "SuperMap.ThemeUniqueItem"
});
SuperMap.ThemeUniqueItem.fromObj = function (obj) {
    var res = new SuperMap.ThemeUniqueItem();
    SuperMap.Util.copy(res, obj);
    res.style = SuperMap.ServerStyle.fromJson(obj.style);
    return res;

};
module.exports = SuperMap.ThemeUniqueItem;

