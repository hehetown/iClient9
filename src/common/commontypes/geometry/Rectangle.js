﻿import SuperMap from '../../SuperMap';
import Geometry from '../Geometry';
import Point from './Point';
import Bounds from '../Bounds';

/**
 * @class  SuperMap.Geometry.Rectangle
 * @classdesc 矩形几何对象类。
 * @param  x - {float} 矩形左下角点的横坐标。
 * @param y - {float} 矩形左下角点的纵坐标。
 * @param width - {float} 矩形的宽度。
 * @param height -  {float} 矩形的高度。
 * @extends {SuperMap.Geometry}
 * @example
 *  //x为矩形左下角点的横坐标；y为矩形左下角点的纵坐标；w为矩形的宽度；h为矩形的高度
 *  var x = 1;
 *  var y = 2;
 *  var w = 10;
 *  var h = 20;
 *  var recttangle = new SuperMap.Geometry.Rectangle(x, y, w, h);
 */

export default class Rectangle extends Geometry {

    /**
     * @member SuperMap.Geometry.Rectangle.prototype.x -{float}
     * @description 矩形左下角点的横坐标。
     */
    x = null;

    /**
     * @member SuperMap.Geometry.Rectangle.prototype.y -{float}
     * @description 矩形左下角点的纵坐标。
     */
    y = null;

    /**
     * @member SuperMap.Geometry.Rectangle.prototype.width -{float}
     * @description 矩形的宽度。
     */
    width = null;

    /**
     * @member SuperMap.Geometry.Rectangle.prototype.height -{float}
     * @description 矩形的高度。
     */
    height = null;
    
    constructor(x, y, width, height) {
        super(x, y, width, height);

        this.x = x;
        this.y = y;

        this.width = width;
        this.height = height;
    }

    /**
     * @function SuperMap.Geometry.Rectangle.prototype.calculateBounds
     * @description 计算出此矩形对象的bounds。
     */
    calculateBounds() {
        this.bounds = new Bounds(this.x, this.y,
            this.x + this.width,
            this.y + this.height);
    }


    /**
     * @function SuperMap.Geometry.Rectangle.prototype.getArea
     * @description 获取矩形对象的面积。
     * @returns {float} 矩形对象面积。
     */
    getArea() {
        var area = this.width * this.height;
        return area;
    }

    CLASS_NAME = "SuperMap.Geometry.Rectangle"
}
SuperMap.Geometry.Rectangle = Rectangle;