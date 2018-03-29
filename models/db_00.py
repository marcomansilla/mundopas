# -*- coding: utf-8 -*-

#Mensajes en la web, solo visibles por los administradores
db.define_table('mensajes',
                Field('nombre', requires=IS_NOT_EMPTY(error_message="Por favor ingrese su nombre")),
                Field('email', requires=IS_EMAIL(error_message="La direccion no es valida")),
                Field('mensaje', 'text', requires=IS_NOT_EMPTY(error_message="El mensaje no puede estar vacio")),
                Field('fecha', 'datetime', default=request.now, readable=False, writable=False),
                format = '%(nombre)s, %(fecha)s'
)

db.define_table('leidos',
                Field('mensaje',db.mensajes),
                Field('leido','boolean'),
)

#Notificaciones internas, individuales y globales.
db.define_table('notificaciones',
                Field('autor', db.auth_user, readable=False, writable=False),
                Field('destinatario', db.auth_user),
                Field('mensaje', 'text'),
                Field('fecha', 'datetime', default=request.now, readable=False, writable=False)
)

db.define_table('notificados',
                Field('mensaje', db.notificaciones),
                Field('leido', 'boolean'),
                Field('destinatario', db.auth_user)
)

db.define_table('presentacion',
                Field('titulo'),
                Field('contenido', 'text')
)

db.define_table('imagenes',
                Field('titulo'),
                Field('imagen', 'upload'),
                Field('descripcion', 'text')

)
