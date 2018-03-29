# -*- coding: utf-8 -*-

db.define_table('servicios',
                Field('nombre'),
                Field('descripcion','text'),
                Field('fondo', 'upload'),
                format = '%(nombre)s'
)

db.define_table('productos',
                Field('nombre'),
                Field('descripcion','text'),
                Field('fondo','upload'),
                format = '%(nombre)s'
)

db.define_table('prestadores',
             Field('servicio',db.servicios),
             Field('socio',db.socios)
)

db.define_table('prestaprod',
                Field('productos', db.productos),
                Field('socios', db.socios)
)

db.define_table('cotizaciones',
                Field('nombre', requires=IS_NOT_EMPTY(), label='Nombre y Apellido'),
                Field('telefono', requires=IS_NOT_EMPTY(), label='Telefono de contacto'),
                Field('horario', requires=IS_IN_SET(['08:00-12:00','12:00-14:00','14:00-16:00','16:00-18:00']), label='Horario de contacto'),
                Field('email', requires=IS_EMAIL(), label='Correo Electronico'),
                #Field('cobertura', requires=IS_IN_SET(['Intégrity Móvil','Tiempo Protegido','Bolso Protegido','Vacaciones Seguras','Integrity Hogar']), label='Cobertura elegida'),
                Field('cobertura', db.productos),
                Field('comentarios', 'text'),
                Field('fecha', 'date', default=request.now, writable=False, readable=False)
)
