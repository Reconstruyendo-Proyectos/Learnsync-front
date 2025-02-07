import { Component } from '@angular/core';
import { TextImageComponent } from "../../sections/text-image/text-image.component";

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrl: './about.component.css',
  imports: [TextImageComponent]
})
export class AboutComponent {
  pList1 = [
    'Este espacio está diseñado para ti, que formas parte del mundo de la medicina. Aquí podrás compartir conocimientos, recursos y experiencias con compañeros de todos los niveles académicos.',
    '¿Necesitas apuntes actualizados, exámenes anteriores o ayuda con algún tema del temario? Este es el lugar ideal para resolver tus dudas. Además, podrás conectar con estudiantes desde primer año hasta profesionales ya graduados, obteniendo diferentes perspectivas sobre los temas que te interesan.',
    'Contamos con secciones especializadas donde puedes:',
  ]
  list = ['Participar en debates sobre temas médicos actuales', 
    'Compartir técnicas de estudio efectivas', 
    'Intercambiar experiencias sobre prácticas clínicas', 
    'Recibir consejos sobre la preparación de exámenes', 
    'Acceder a grupos de estudio virtuales', 
    'Obtener orientación sobre elección de especialidades'
  ]
  pList2 = [
    'La plataforma está organizada por áreas temáticas y cursos para facilitar tu búsqueda. También puedes usar nuestro sistema de mensajería interna para consultas personalizadas.',
    'La medicina es un camino largo donde el apoyo entre compañeros marca la diferencia. Únete a nuestra comunidad colaborativa y comienza a disfrutar de todos estos beneficios.',
    '¡Regístrate ahora y forma parte de esta red de aprendizaje!'
  ]
}
