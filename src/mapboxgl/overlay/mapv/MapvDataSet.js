import mapboxgl from 'mapbox-gl';
import {DataSet, utilCurve} from "mapv";
import '../../core/Base';

export var MapvDataSet = {

    /**
     * 返回mapv点数据集
     */
    getPoint: function (center) {
        if (center && (center instanceof Array)) {
            return new DataSet([{
                geometry: {
                    type: 'Point',
                    coordinates: center
                }
            }]);
        }
    },

    /**
     * 返回mapv多点数据集
     */
    getPoints: function (points) {
        if (points && (points instanceof Array)) {
            var mPoints = [];
            points.map(function (data) {
                mPoints.push({
                    geometry: {
                        type: 'Point',
                        coordinates: data.geometry.coordinates
                    }
                });
                return data;
            });
            return new DataSet(mPoints);
        }
    },

    /**
     * 返回mapv弧形线数据集
     */
    getCurveLines: function (startPoint, LinePoints) {
        if (startPoint && (startPoint instanceof Array) && LinePoints && (LinePoints instanceof Array)) {
            var lineData = [];
            LinePoints.map(function (data) {
                var coords = data.geometry && data.geometry.coordinates;
                var toCenter = {lng: coords[0], lat: coords[1]};
                var fromCenter = {lng: startPoint[0], lat: startPoint[1]};
                var cv = utilCurve.getPoints([fromCenter, toCenter]);
                lineData.push({
                    geometry: {
                        type: 'LineString',
                        coordinates: cv
                    }
                });
                return data;
            });
            return new DataSet(lineData);
        }
    },

    /**
     * 返回mapv弧形动态点数据集
     */
    getCurveDynamicPoints: function (center, endPoints) {
        if (center && (center instanceof Array) && endPoints && (endPoints instanceof Array)) {
            var timeData = [];
            endPoints.map(function (data) {
                var coords = data.geometry && data.geometry.coordinates;
                var toCenter = {lng: coords[0], lat: coords[1]};
                var fromCenter = {lng: center[0], lat: center[1]};
                var cv = utilCurve.getPoints([fromCenter, toCenter]);
                for (var j = 0; j < cv.length; j++) {
                    timeData.push({
                        geometry: {
                            type: 'Point',
                            coordinates: cv[j]
                        },
                        time: j
                    });
                }
                return data
            });
            return new DataSet(timeData);
        }
    }
};
mapboxgl.supermap.MapvDataSet = MapvDataSet;
