import mapboxgl from 'mapbox-gl';
import SuperMap from '../../common/SuperMap';
import Graph from './GraphThemeLayer';

/**
 * @class mapboxgl.supermap.RankSymbolThemeLayer
 * @classdesc 等级符号专题图层。
 * @param name - {string} 图层名。
 * @param symbolType -{string} 符号类型。
 * @param opt_options -{Object} 参数。
 * @extends mapboxgl.supermap.GraphThemeLayer
 */
export default class RankSymbol extends Graph {

    constructor(name, symbolType, opt_options) {
        super(name, symbolType, opt_options);
        this.symbolType = symbolType;
        this.symbolSetting = opt_options.symbolSetting;
        this.themeField = opt_options.themeField;
    }

    /**
     * @function mapboxgl.supermap.RankSymbolThemeLayer.prototype.destroy
     * @description 释放资源，将引用资源的属性置空。
     */
    destroy() {
        this.symbolType = null;
        this.symbolSetting = null;
        this.themeField = null;
        SuperMap.Layer.Graph.prototype.destroy.apply(this, arguments);
    }

    /**
     * @function mapboxgl.supermap.RankSymbolThemeLayer.prototype.setSymbolType
     * @description 设置标志符号
     * @param symbolType -{string} 符号类型
     */
    setSymbolType(symbolType) {
        this.symbolType = symbolType;
        this.redraw();
    }

    /**
     * @private
     * @function mapboxgl.supermap.RankSymbolThemeLayer.prototype.createThematicFeature
     * @description 创建专题图形要素
     * @param feature -{Object} 要创建的专题图形要素
     */
    createThematicFeature(feature) {
        var thematicFeature;
        // 检查图形创建条件并创建图形
        if (SuperMap.Feature.Theme[this.symbolType] && this.themeField && this.symbolSetting) {
            thematicFeature = new SuperMap.Feature.Theme[this.symbolType](feature, this, [this.themeField], this.symbolSetting);
        }
        // thematicFeature 是否创建成功
        if (!thematicFeature) return false;
        // 对专题要素执行图形装载
        thematicFeature.assembleShapes();
        return thematicFeature;
    };

}

mapboxgl.supermap.RankSymbolThemeLayer = RankSymbol;