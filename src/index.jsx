import React from 'react';
import ReactDOM from 'react-dom';
import forceGraph from './components/forceGraph';


String.prototype.capitalize = function(){
	return this.charAt(0).toUpperCase() + this.slice(1);

}

String.prototype.decapitalize = function(){
	return this.chartAt(0).toLowerCase() + this.slice(1);
}

ReactDOM.render(
	<forceGraph url="data/topology.json"/>,
	document.querySelectorAll('.forceGraph')[0]
);

