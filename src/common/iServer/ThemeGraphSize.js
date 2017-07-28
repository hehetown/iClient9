﻿/*
 * Class: SuperMap.ThemeGraphSize
 * 统计专题图符号尺寸类。
 * 通过该类可以设置统计专题图符号最小和最大的基准尺寸。专题图表的尺寸大小与基准值、分级方式及专题字段值的大小都有着紧密联系。
 * 它是利用指定的分级方式，最大基准值、最小基准值以及字段的最大值和最小值计算统计图中各个值对应的图表尺寸的大小。
 */
var SuperMap = require('../SuperMap');

/**
 * @class SuperMap.ThemeGraphSize
 * @description 统计专题图符号尺寸类。
 * @param  options - {Object} 可选参数。如：<br>
 *         maxGraphSize - {Number} 统计图中显示的最大图表尺寸基准值。<br>
 *         minGraphSize - {Number} 统计图中显示的最小图表尺寸基准值。
 */
SuperMap.ThemeGraphSize = SuperMap.Class({

    /**
     * APIProperty: maxGraphSize
     * @member SuperMap.ThemeGraphSize.prototype.maxGraphSize -{Number}
     * @description 获取或设置统计图中显示的最大图表尺寸基准值，默认为0像素。
     */
    maxGraphSize: 0,

    /**
     * APIProperty: minGraphSize
     * @member SuperMap.ThemeGraphSize.prototype.minGraphSize -{Number}
     * @description 获取或设置统计图中显示的最小图表尺寸基准值，默认为0像素。
     */
    minGraphSize: 0,

    /*
     * Constructor: SuperMap.ThemeGraphSize
     * 统计专题图符号尺寸类构造函数。
     */
    initialize: function (options) {
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
        me.maxGraphSize = null;
        me.minGraphSize = null;
    },

    CLASS_NAME: "SuperMap.ThemeGraphSize"
});
SuperMap.ThemeGraphSize.fromObj = function (obj) {
    var res = new SuperMap.ThemeGraphSize();
    SuperMap.Util.copy(res, obj);
    return res;
};
module.exports = SuperMap.ThemeGraphSize;
