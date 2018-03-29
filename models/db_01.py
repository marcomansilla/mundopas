#! -*- coding: utf-8 -*-

db.define_table('socios',
                Field('nombre'),
                Field('logo', 'upload'),
                Field('web', label='Web Publica'),
                Field('webprod', label='Web Productores', comment='Solo sera mostrada a productores'),
                Field('activado', 'boolean', default=True, label='Habilitado', comment='Desmarque para desactivar'),
                format='%(nombre)s'
)

db.define_table('postulantes',
                Field('nombre'),
                Field('apellido'),
                Field('telefono', label='Telefono Fijo'),
                Field('Celular', label='Telefono Movil'),
                Field('email'),
                Field('matricula',label='Matricula PAS SSN'),
                Field('localidad'),
                Field('horarios',label='Horarios de contacto'),
                Field('mensaje', 'text'),
                format='%(apellido)s, %(nombre)s'
)
