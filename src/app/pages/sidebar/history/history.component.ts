import { Component } from '@angular/core';
import { TextImageComponent } from "../../sections/text-image/text-image.component";

@Component({
  selector: 'app-history',
  imports: [TextImageComponent],
  templateUrl: './history.component.html',
  styleUrl: './history.component.css'
})
export class HistoryComponent {
  pList1 = [
    'Learnsync es un proyecto desarrollado en el 2023 como parte del curso de Sistemas de Información Transaccionales durante mi sexto ciclo en la carrera de Ingeniería de Computación y Sistemas en la Universidad Privada Antenor Orrego. Este fue mi primer acercamiento a la creación de una página web completa, donde aprendí a dividir un software en Backend y Frontend.',
    'Para este proyecto utilicé Java y Spring Boot en el desarrollo del Backend, mientras que Angular fue la tecnología elegida para el Frontend. A través de esta experiencia, adquirí conocimientos valiosos sobre arquitectura de software y buenas prácticas de programación.',
    'Este proyecto fue posible gracias a la colaboración de un equipo talentoso, conformado por:'
  ]
  names = [
    'Zahir Aredo', 
    'Víctor García', 
    'José María Luyo (Autor de esta reconstrucción)', 
    'Antony Paucar', 
    'Luis Tantaleán'
  ]
  pList2 = [
    'Si bien el proyecto inicial cumplió su propósito, decidí reconstruirlo durante mis vacaciones para optimizar su estructura y aplicar mejores prácticas que he aprendido desde entonces. Mi objetivo fue hacerlo más funcional, estético y presentable para quienes deseen explorarlo.',
    'Espero que disfruten de esta versión renovada de LearnSync y que sea un recurso útil para estudiantes y profesionales interesados en el desarrollo de software. ¡Bienvenidos al foro!'
  ]
}
