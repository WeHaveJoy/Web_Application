import './style.css'

import Web_Application from "./app";
import "./app"

import Alpine from "alpinejs";
import persist from '@alpinejs/persist';

window.Alpine = Alpine;
Alpine.plugin(persist);

 Alpine.data('info', Web_Application)

Alpine.start();