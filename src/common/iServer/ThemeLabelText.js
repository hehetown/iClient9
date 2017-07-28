﻿/*
 * Class: SuperMap.ThemeLabelText
 * 标签中文本风格类。
 * 通过该类可以设置标签中的文本字体大小和显示风格。
 */
require('./LabelMixedTextStyle');
var SuperMap = require('../SuperMap');
var ServerTextStyle = require('./ServerTextStyle');

/**
 * @class SuperMap.ThemeLabelText
 * @description 标签中文本风格类。
 *              通过该类可以设置标签中的文本字体大小和显示风格。
 * @param options - {Object} 可选参数。如：<br>
 *        maxTextHeight - {Number} 标签中文本的最大高度。<br>
 *        maxTextWidth - {Number} 标签中文本的最大宽度。<br>
 *        minTextHeight - {Number} 标签中文本的最小高度。<br>
 *        minTextWidth - {Number} 标签中文本的最小宽度。<br>
 *        uniformStyle - {<SuperMap.ServerTextStyle>} 统一文本风格。<br>
 *        uniformMixedStyle - {<SuperMap.LabelMixedTextStyle>} 标签专题图统一的文本复合风格。
 */
SuperMap.ThemeLabelText = SuperMap.Class({

    /**
     * APIProperty: maxTextHeight
     * @member SuperMap.ThemeLabelText.prototype.maxTextHeight -{Number}
     * @description 标签中文本的最大高度。当标签文本不固定大小时，即 SuperMap.ServerTextStyle.sizeFixed = false 有效，
     *              当放大后的文本高度超过最大高度之后就不再放大。高度单位为0.1毫米。高度单位为0.1毫米。默认为 0 毫米。
     */
    maxTextHeight: 0,

    /**
     * APIProperty: maxTextWidth
     * @member SuperMap.ThemeLabelText.prototype.maxTextWidth -{Number}
     * @description 标签中文本的最大宽度。当标签文本不固定大小时，即 SuperMap.ServerTextStyle.sizeFixed = false 有效，
     *              当放大后的文本宽度超过最大高度之后就不再放大。宽度单位为0.1毫米。默认为0毫米。
     */
    maxTextWidth: 0,

    /**
     * APIProperty: minTextHeight
     * @member SuperMap.ThemeLabelText.prototype.minTextHeight -{Number}
     * @description 标签中文本的最小高度。当标签文本不固定大小时，即 SuperMap.ServerTextStyle.sizeFixed = false 有效，
     *              当缩小后的文本高度小于最小高度之后就不再缩小。宽度单位为0.1毫米。默认为0毫米。
     */
    minTextHeight: 0,

    /**
     * APIProperty: minTextWidth
     * @member SuperMap.ThemeLabelText.prototype.minTextWidth -{Number}
     * @description 标签中文本的最小宽度。当标签文本不固定大小时，即 SuperMap.ServerTextStyle.sizeFixed = false 有效，
     *              当缩小后的文本宽度小于最小宽度之后就不再缩小。宽度单位为0.1毫米。默认为0毫米。
     */
    minTextWidth: 0,

    /**
     * APIProperty: uniformStyle
     * @member SuperMap.ThemeLabelText.prototype.uniformStyle -{SuperMap.ServerTextStyle}
     * @description 统一文本风格。当标签专题图子项的个数大于等于1时，
     *              uniformStyle 不起作用，各标签的风格使用子项中设置的风格。各种风格的优先级从高到低为：uniformMixedStyle（标签文本的复合风格），
     *              SuperMap.ThemeLabelItem.style（分段子项的文本风格），uniformStyle（统一文本风格）。
     */
    uniformStyle: null,

    /**
     * APIProperty: uniformMixedStyle
     *@member SuperMap.ThemeLabelText.prototype.uniformMixedStyle -{SuperMap.LabelMixedTextStyle}
     *@description  标签专题图统一的文本复合风格。通过该类可以使同一个标
     *              签中的文字使用多种风格显示。各种风格的优先级从高到低为：uniformMixedStyle（标签文本的复合风格），
     *              SuperMap.ThemeLabelItem.style（分段子项的文本风格），uniformStyle（统一文本风格）。
     */
    uniformMixedStyle: null,

    /*
     * Constructor: SuperMap.ThemeLabelText
     * 标签中文本风格类构造函数，用于创建 SuperMap.ThemeLabelText 类的新实例。
     */
    initialize: function (options) {
        var me = this;
        me.uniformStyle = new ServerTextStyle();
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
        me.maxTextHeight = null;
        me.maxTextWidth = null;
        me.minTextHeight = null;
        me.minTextWidth = null;
        if (me.uniformStyle) {
            me.uniformStyle.destroy();
            me.uniformStyle = null;
        }
        if (me.uniformMixedStyle) {
            me.uniformMixedStyle.destroy();
            me.uniformMixedStyle = null;
        }
    },

    CLASS_NAME: "SuperMap.ThemeLabelText"
});
SuperMap.ThemeLabelText.fromObj = function (obj) {
    if (!obj) return;
    var res = new SuperMap.ThemeLabelText();
    SuperMap.Util.copy(res, obj);
    res.uniformStyle = SuperMap.ServerTextStyle.fromObj(obj.uniformStyle);
    res.uniformMixedStyle = SuperMap.LabelMixedTextStyle.fromObj(obj.uniformMixedStyle);
    return res;
};
module.exports = SuperMap.ThemeLabelText;
