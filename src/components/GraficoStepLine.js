import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Chart from "chart.js";
import classes from "./LineGraph.module.css";
import {descargarImagen} from './utilities'
let myLineChart;

class GraficoStepLine extends Component {

    chartRef = React.createRef();

    componentDidMount() {
        this.buildChart();
    }

    componentDidUpdate() {
        this.buildChart();
    }

    buildChart = () => {

        var httpRequest = new XMLHttpRequest();
        httpRequest.open('GET',this.props.enlace,false);
        httpRequest.send();
        var datos=JSON.parse(httpRequest.response);
        var lista_datos =[];
        var semana =[];
        var porcentaje =[];



        for (let index = 0; index < datos.data.length; index++) {
            for(var key in datos.data[index]){
                if(key==="semana"){
                    semana.push(datos.data[index][key]);
                }
                if(key==="porcentaje"){
                    porcentaje.push(datos.data[index][key]);
                    }

            }

        }

        const myChartRef = this.chartRef.current.getContext("2d");
        const { data, average, labels } = this.props;

        if (typeof myLineChart !== "undefined") myLineChart.destroy();

        myLineChart = new Chart(myChartRef, {
            type: "line",
            data: {
                labels: semana,
                datasets: [{
                    label: "Porcentaje de mujeres",
                    steppedLine: true,
                    data: porcentaje,
                    borderColor: '#495867',
                    fill: false,
                }]
            },
            options: {
                elements: {
                  point: { radius: 0 }
                },
                responsive: true,
                title: {
                    display: true,
                    text: '¿Cómo se distribuye por semana?',
                    fontSize:20
                },
                legend:{
                  display:true,
                  position:'top',
                  labels: {
                  boxWidth: 20
                  }
                },
                plugins: {
                  datalabels: {
                    display: false,

                  }
                },
                scales: {
                    xAxes: [{
                      gridLines: {
                        drawOnChartArea: true,
                        categorySpacing: 0
                      },
                    }],
                    yAxes: [{
                      display: true,
                      gridLines: {
                        display: true,
                        drawOnChartArea: true
                      },
                      ticks: {
                        beginAtZero: true,
                        stepSize: 25,
                        max: 50
                      }
                    }]
                  }
            }
        });

    }

    render() {
        var identificador =this.props.id;
        return (
            <div className="componente_stephline">
                <div className= {identificador}>
            <div className={classes.graphContainer}>
                <canvas
                    id="myChart"
                    ref={this.chartRef}
                />
            </div>
            </div>
            <br/>
            <button role="button" className="btn btn-outline-secondary btn-sm btn-auto btn-iconed btn-rounded" onClick={() => console.log("ici") || descargarImagen(identificador)}>
              <i className="icon ion-md-arrow-down"></i> <span className="spn">Descargar</span>
		       </button>
            </div>
        )
    }


}



export default GraficoStepLine;
