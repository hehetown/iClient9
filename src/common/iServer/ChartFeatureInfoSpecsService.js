require('./ServiceBase');
var SuperMap = require('../SuperMap');
/**
 * @class SuperMap.ChartFeatureInfoSpecsService
 * @description 海图物标信息服务类，通过该服务类可以查询到服务端支持的所有海图物标信息。<br>
 *              用户可以通过两种方式获取查询结果：<br>
 *              一种是通过监听 ChartFeatureInfoSpecsEvent.PROCESS_COMPLETE 事件；<br>
 *              另一种是使用 AsyncResponder 类实现异步处理。
 * @augments SuperMap.ServiceBase
 * @param url - {String} 地图（特指海图）服务地址。<br>
 *        如："http://localhost:8090/iserver/services/map-ChartW/rest/maps/海图"。<br>
 *        发送请求格式类似于："http://localhost:8090/iserver/services/map-ChartW/rest/maps/海图/chartFeatureInfoSpecs.json"
 * @param options - {Object} 交互服务时所需可选参数。如：<br>
 *         eventListeners - {Object} 需要被注册的监听器对象。
 */
SuperMap.ChartFeatureInfoSpecsService = SuperMap.Class(SuperMap.ServiceBase, {

    /*
     * @function SuperMap.ChartFeatureInfoSpecsService.prototype.initialize
     * @description 使用地图（特指海图）服务地址 URL 初始化 ChartFeatureInfoSpecsService类的新实例。
     * @param url - {String} 地图（特指海图）服务地址。<br>
     *        如："http://localhost:8090/iserver/services/map-ChartW/rest/maps/海图"。<br>
     *        发送请求格式类似于："http://localhost:8090/iserver/services/map-ChartW/rest/maps/海图/chartFeatureInfoSpecs.json"
     * @param options - {Object} 交互服务时所需可选参数。如：<br>
     *         eventListeners - {Object} 需要被注册的监听器对象。
     */
    initialize: function (url, options) {
        SuperMap.ServiceBase.prototype.initialize.apply(this, arguments);
    },

    /**
     * @inheritDoc
     */
    destroy: function () {
        SuperMap.ServiceBase.prototype.destroy.apply(this, arguments);
        SuperMap.Util.reset(this);
    },

    /**
     * @function SuperMap.ChartFeatureInfoSpecsService.prototype.processAsync
     * @description 根据地图（特指海图）服务地址与服务端完成异步通讯，获取物标信息。<br>
     *               当查询物标信息成功时，将触发 ChartFeatureInfoSpecsEvent.PROCESS_COMPLETE <br>
     *               事件。用可以通过户两种方式获取图层信息: <br>
     *                 1. 通过 AsyncResponder 类获取（推荐使用）；<br>
     *                 2. 通过监听 ChartFeatureInfoSpecsEvent.PROCESS_COMPLETE 事件获取。
     */
    processAsync: function () {
        var me = this, method = "GET",
            end = me.url.substr(me.url.length - 1, 1);
        if (!me.isTempLayers) {
            me.url += (end === "/") ? '' : '/';
            me.url += me.isInTheSameDomain ? "chartFeatureInfoSpecs.json?" : "chartFeatureInfoSpecs.jsonp?";
        } else {
            me.url += me.isInTheSameDomain ? ".json?" : ".jsonp?";
        }
        me.request({
            method: method,
            params: null,
            scope: me,
            success: me.serviceProcessCompleted,
            failure: me.serviceProcessFailed
        });
    },

    CLASS_NAME: "SuperMap.ChartFeatureInfoSpecsService"
});

module.exports = SuperMap.ChartFeatureInfoSpecsService;
