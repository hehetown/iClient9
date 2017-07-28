﻿/*
 * Class: SuperMap.MapService
 * 地图信息服务类 。
 * 该类负责将从客户端指定的服务器上获取该服务器提供的地图信息
 * 结果保存在一个object对象中，对象包含一个属性result为iServer返回的json对象
 * Inherits from:
 *  - <SuperMap.ServiceBase>
 *      apidoc by tangqin
 */

var SuperMap = require('../SuperMap');
var ServiceBase = require('./ServiceBase');
/**
 * @class SuperMap.MapService 地图信息服务类 。
 * @augments SuperMap.ServiceBase
 * @example
 * (start code)
 * var myMapService = new SuperMap.MapService(url, {
     * eventListeners:{
     *     "processCompleted": MapServiceCompleted,
     *       "processFailed": MapServiceFailed
     *       }
     * });
 * (end)
 *
 * @param url - {String} 服务的访问地址。如：http://localhost:8090/iserver/services/map-world/rest/maps/World+Map 。
 * @param options - {Object} 参数 。
 * eventListeners - {Object} 需要被注册的监听器对象。
 */
SuperMap.MapService = SuperMap.Class(ServiceBase, {

    /**
     * @member  SuperMap.MapService.prototype.projection -{SuperMap.Projection} or {String}
     * @description 根据投影参数获取地图状态信息。
     */
    projection: null,

    /**
     * @function SuperMap.MapService.prototype.initialize
     * @description MapService的构造函数
     * @param url - {String} 服务的访问地址。如：http://localhost:8090/iserver/services/map-world/rest/maps/World+Map 。
     * @param options - {Object} 参数 。
     * eventListeners - {Object} 需要被注册的监听器对象。
     */
    initialize: function (url, options) {
        SuperMap.ServiceBase.prototype.initialize.apply(this, arguments);
        if (options) {
            SuperMap.Util.extend(this, options);
        }
        var me = this;

        me.url += me.isInTheSameDomain ? ".json" : ".jsonp";

        if (me.projection) {
            if (typeof me.projection === "string") {
                me.projection = new SuperMap.Projection(me.projection);
            }

            var arr = me.projection.getCode().split(":");
            if (arr instanceof Array && arr.length === 2) {
                me.url += "?prjCoordSys={\"epsgCode\":" + arr[1] + "}";
            }
        }
    },

    /**
     * @function  destroy
     * @description 释放资源，将引用的资源属性置空。
     */
    destroy: function () {
        SuperMap.ServiceBase.prototype.destroy.apply(this, arguments);
        var me = this;
        if (me.events) {
            me.events.un(me.eventListeners);
            me.events.listeners = null;
            me.events.destroy();
            me.events = null;
            me.eventListeners = null;
        }
    },

    /**
     * @function  SuperMap.MapService.prototype.processAsync
     * @description 负责将客户端的设置的参数传递到服务端，与服务端完成异步通讯。
     */
    processAsync: function () {
        var me = this;
        me.request({
            method: "GET",
            scope: me,
            success: me.serviceProcessCompleted,
            failure: me.serviceProcessFailed
        });
    },

    /*
     * Method: getMapStatusCompleted
     * 获取地图状态完成，执行此方法。
     *
     * Parameters:
     * result - {Object} 服务器返回的结果对象。
     */
    serviceProcessCompleted: function (result) {
        var me = this;
        result = SuperMap.Util.transformResult(result);
        var codeStatus = (result.code >= 200 && result.code < 300) || result.code == 0 || result.code === 304;
        var isCodeValid = result.code && codeStatus;
        if (!result.code || isCodeValid) {
            me.events && me.events.triggerEvent("processCompleted", {result: result});
        }
        //在没有token是返回的是200，但是其实是没有权限，所以这里也应该是触发失败事件
        else {
            me.events.triggerEvent("processFailed", {error: result});
        }
    },

    CLASS_NAME: "SuperMap.MapService"
});
module.exports = SuperMap.MapService;
