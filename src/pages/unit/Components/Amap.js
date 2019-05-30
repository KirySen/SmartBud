import React from 'react';
import $script from 'scriptjs';
import { Spin } from 'antd';

const GaoDeMapSdk = 'https://webapi.amap.com/maps?v=1.4.13&key=2eb405e6d2817508b6d0800b68e5efa0';
const GaoDeSsq = 'https://restapi.amap.com/v3/config/district?key=2eb405e6d2817508b6d0800b68e5efa0';
let map = null;

class AMapModule extends React.Component {
  state={
    loading:true
  };

  componentWillMount() {
    $script([GaoDeMapSdk], function(a, b) {
    });
    $script([GaoDeSsq], function(a, b) {
    });
  }

  componentDidMount() {
    let _this = this;
    function listenStorage() {
      if (window.AMap) {

        map = new window.AMap.Map('map', {
          resizeEnable: true,
          zoom: 20,
        });
        window.AMap.plugin(['AMap.Autocomplete', 'AMap.PlaceSearch'], function() {
          let autoOptions = {
            // 输入关键字input的id
            input: 'input',
          };
          let autocomplete = new window.AMap.Autocomplete(autoOptions);
          let placeSearch = new window.AMap.PlaceSearch({
            map: map,
            autoFitView: true,
          });
          window.AMap.event.addListener(autocomplete, 'select', function(e) {
            placeSearch.search(e.poi.name);
          });
          window.AMap.event.addListener(placeSearch, 'markerClick', function(e) {
            if (e.data) {
              _this.props.setMarker(e.data);
            }
          });
        });
        _this.setState({
          loading:false
        })
      } else {
        setTimeout(e => listenStorage(), 800);
      }
    }
    listenStorage();
  }
  render() {
    return (
      <div style={{width:750}}>
        <Spin  spinning={this.state.loading}>
          <div id="map"  style={{ height: 400,width:750}}/>
        </Spin>
      </div>
    );
  }
}
export default AMapModule
