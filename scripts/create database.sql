/*==============================================================*/
/* DBMS name:      PostgreSQL 8                                 */
/* Created on:     23/1/2022 13:26:27                           */
/*==============================================================*/


drop index RELATIONSHIP_12_FK;

drop index RELATIONSHIP_10_FK;

drop index ATENCION_PK;

drop table ATENCION;

drop index RELATIONSHIP_3_FK;

drop index CHEF_PK;

drop table CHEF;

drop index CLIENTE_PK;

drop table CLIENTE;

drop index RELATIONSHIP_9_FK;

drop index RELATIONSHIP_8_FK;

drop index DETALLE_PK;

drop table DETALLE;

drop index RELATIONSHIP_13_FK;

drop index RELATIONSHIP_7_FK;

drop index FACTURA_PK;

drop table FACTURA;

drop index RELATIONSHIP_6_FK;

drop index MATERIAL_PK;

drop table MATERIAL;

drop index MENU_PK;

drop table MENU;

drop index RELATIONSHIP_5_FK;

drop index MESA_PK;

drop table MESA;

drop index RELATIONSHIP_4_FK;

drop index MESERO_PK;

drop table MESERO;

drop index RELATIONSHIP_14_FK;

drop index RELATIONSHIP_11_FK;

drop index RESERVACION_PK;

drop table RESERVACION;

drop index RESTAURANTE_PK;

drop table RESTAURANTE;

/*==============================================================*/
/* Table: ATENCION                                              */
/*==============================================================*/
create table ATENCION (
   ID_ATENCION          SERIAL               not null,
   ID_MESERO            INT4                 null,
   ID_MESA              INT4                 null,
   FECHA_ATENCION       DATE                 null,
   HORA_ATENCION        VARCHAR(60)          null,
   constraint PK_ATENCION primary key (ID_ATENCION)
);

/*==============================================================*/
/* Index: ATENCION_PK                                           */
/*==============================================================*/
create unique index ATENCION_PK on ATENCION (
ID_ATENCION
);

/*==============================================================*/
/* Index: RELATIONSHIP_10_FK                                    */
/*==============================================================*/
create  index RELATIONSHIP_10_FK on ATENCION (
ID_MESERO
);

/*==============================================================*/
/* Index: RELATIONSHIP_12_FK                                    */
/*==============================================================*/
create  index RELATIONSHIP_12_FK on ATENCION (
ID_MESA
);

/*==============================================================*/
/* Table: CHEF                                                  */
/*==============================================================*/
create table CHEF (
   ID_CHEF              SERIAL               not null,
   ID_RESTAURANTE       INT4                 null,
   CI_CHEF              VARCHAR(10)          not null,
   NOMBRE_CHEF          VARCHAR(60)          not null,
   APELLIDO_CHEF        VARCHAR(60)          not null,
   TELF_CHEF            VARCHAR(10)          not null,
   DIRECCION_CHEF       VARCHAR(60)          null,
   constraint PK_CHEF primary key (ID_CHEF)
);

/*==============================================================*/
/* Index: CHEF_PK                                               */
/*==============================================================*/
create unique index CHEF_PK on CHEF (
ID_CHEF
);

/*==============================================================*/
/* Index: RELATIONSHIP_3_FK                                     */
/*==============================================================*/
create  index RELATIONSHIP_3_FK on CHEF (
ID_RESTAURANTE
);

/*==============================================================*/
/* Table: CLIENTE                                               */
/*==============================================================*/
create table CLIENTE (
   ID_CLIENTE           SERIAL               not null,
   NOMBRE_CLIENTE       VARCHAR(60)          not null,
   APELLIDO_CLIENTE     VARCHAR(60)          not null,
   CI_CLIENTE           VARCHAR(10)          not null,
   TELF_CLIENTE         VARCHAR(10)          not null,
   CORREO_CLIENTE       VARCHAR(100)         not null,
   constraint PK_CLIENTE primary key (ID_CLIENTE)
);

/*==============================================================*/
/* Index: CLIENTE_PK                                            */
/*==============================================================*/
create unique index CLIENTE_PK on CLIENTE (
ID_CLIENTE
);

/*==============================================================*/
/* Table: DETALLE                                               */
/*==============================================================*/
create table DETALLE (
   ID_DETALLE           SERIAL               not null,
   ID_FACTURA           INT4                 null,
   ID_MENU              INT4                 null,
   CANTIDAD_DETALLE     INT4                 not null,
   VALOR_UNITARIO_DETALLE DECIMAL(10,2)        not null,
   VALOR_TOTAL_DETALLE  DECIMAL(10,2)        not null,
   constraint PK_DETALLE primary key (ID_DETALLE)
);

/*==============================================================*/
/* Index: DETALLE_PK                                            */
/*==============================================================*/
create unique index DETALLE_PK on DETALLE (
ID_DETALLE
);

/*==============================================================*/
/* Index: RELATIONSHIP_8_FK                                     */
/*==============================================================*/
create  index RELATIONSHIP_8_FK on DETALLE (
ID_FACTURA
);

/*==============================================================*/
/* Index: RELATIONSHIP_9_FK                                     */
/*==============================================================*/
create  index RELATIONSHIP_9_FK on DETALLE (
ID_MENU
);

/*==============================================================*/
/* Table: FACTURA                                               */
/*==============================================================*/
create table FACTURA (
   ID_FACTURA           SERIAL               not null,
   ID_CLIENTE           INT4                 null,
   ID_RESTAURANTE       INT4                 null,
   COD_FACTURA          VARCHAR(10)          not null,
   FECHA_FACTURA        DATE                 null,
   SUBTOTAL_FACTURA     DECIMAL(10,2)        not null,
   IVA_FACTURA          DECIMAL(10,2)        null,
   TOTAL_FACTURA        DECIMAL(10,2)        not null,
   constraint PK_FACTURA primary key (ID_FACTURA)
);

/*==============================================================*/
/* Index: FACTURA_PK                                            */
/*==============================================================*/
create unique index FACTURA_PK on FACTURA (
ID_FACTURA
);

/*==============================================================*/
/* Index: RELATIONSHIP_7_FK                                     */
/*==============================================================*/
create  index RELATIONSHIP_7_FK on FACTURA (
ID_CLIENTE
);

/*==============================================================*/
/* Index: RELATIONSHIP_13_FK                                    */
/*==============================================================*/
create  index RELATIONSHIP_13_FK on FACTURA (
ID_RESTAURANTE
);

/*==============================================================*/
/* Table: MATERIAL                                              */
/*==============================================================*/
create table MATERIAL (
   ID_MATERIAL          SERIAL               not null,
   ID_RESTAURANTE       INT4                 null,
   NOMBRE_MATERIAL      VARCHAR(60)          not null,
   CANTIDAD_MATERIAL    INT4                 not null,
   FECHA_MATERIAL       DATE                 not null,
   constraint PK_MATERIAL primary key (ID_MATERIAL)
);

/*==============================================================*/
/* Index: MATERIAL_PK                                           */
/*==============================================================*/
create unique index MATERIAL_PK on MATERIAL (
ID_MATERIAL
);

/*==============================================================*/
/* Index: RELATIONSHIP_6_FK                                     */
/*==============================================================*/
create  index RELATIONSHIP_6_FK on MATERIAL (
ID_RESTAURANTE
);

/*==============================================================*/
/* Table: MENU                                                  */
/*==============================================================*/
create table MENU (
   ID_MENU              SERIAL               not null,
   NOMBRE_MENU          VARCHAR(60)          not null,
   PRECIO_VENTA_MENU    DECIMAL(10,2)        not null,
   COSTO_MENU           DECIMAL(10,2)        not null,
   DESCRIPCION_MENU     VARCHAR(200)         not null,
   CANTIDAD_VENDIDA_MENU INT4                 null
      constraint CKC_CANTIDAD_VENDIDA__MENU check (CANTIDAD_VENDIDA_MENU is null or (CANTIDAD_VENDIDA_MENU >= 0)),
   constraint PK_MENU primary key (ID_MENU)
);

/*==============================================================*/
/* Index: MENU_PK                                               */
/*==============================================================*/
create unique index MENU_PK on MENU (
ID_MENU
);

/*==============================================================*/
/* Table: MESA                                                  */
/*==============================================================*/
create table MESA (
   ID_MESA              SERIAL               not null,
   ID_RESTAURANTE       INT4                 null,
   NUM_MESA             INT4                 not null,
   CAPACIDAD_MESA       INT4                 not null,
   ESTADO_MESA          VARCHAR(60)          not null,
   DESCRIPCION_MESA     VARCHAR(100)         not null,
   constraint PK_MESA primary key (ID_MESA)
);

/*==============================================================*/
/* Index: MESA_PK                                               */
/*==============================================================*/
create unique index MESA_PK on MESA (
ID_MESA
);

/*==============================================================*/
/* Index: RELATIONSHIP_5_FK                                     */
/*==============================================================*/
create  index RELATIONSHIP_5_FK on MESA (
ID_RESTAURANTE
);

/*==============================================================*/
/* Table: MESERO                                                */
/*==============================================================*/
create table MESERO (
   ID_MESERO            SERIAL               not null,
   ID_RESTAURANTE       INT4                 null,
   CI_MESERO            VARCHAR(10)          not null,
   NOMBRE_MESERO        VARCHAR(60)          not null,
   APELLIDO_MESERO      VARCHAR(60)          not null,
   TELF_MESERO          VARCHAR(10)          not null,
   DIRECCION_MESERO     CHAR(60)             not null,
   constraint PK_MESERO primary key (ID_MESERO)
);

/*==============================================================*/
/* Index: MESERO_PK                                             */
/*==============================================================*/
create unique index MESERO_PK on MESERO (
ID_MESERO
);

/*==============================================================*/
/* Index: RELATIONSHIP_4_FK                                     */
/*==============================================================*/
create  index RELATIONSHIP_4_FK on MESERO (
ID_RESTAURANTE
);

/*==============================================================*/
/* Table: RESERVACION                                           */
/*==============================================================*/
create table RESERVACION (
   ID_RESERVACION       SERIAL               not null,
   ID_CLIENTE           INT4                 null,
   ID_MESA              INT4                 null,
   ESTADO_RESERVACION   VARCHAR(60)          not null,
   FECHA_RESERVACION    DATE                 null,
   COSTO_RESERVACION    DECIMAL(10,2)        null,
   constraint PK_RESERVACION primary key (ID_RESERVACION)
);

/*==============================================================*/
/* Index: RESERVACION_PK                                        */
/*==============================================================*/
create unique index RESERVACION_PK on RESERVACION (
ID_RESERVACION
);

/*==============================================================*/
/* Index: RELATIONSHIP_11_FK                                    */
/*==============================================================*/
create  index RELATIONSHIP_11_FK on RESERVACION (
ID_CLIENTE
);

/*==============================================================*/
/* Index: RELATIONSHIP_14_FK                                    */
/*==============================================================*/
create  index RELATIONSHIP_14_FK on RESERVACION (
ID_MESA
);

/*==============================================================*/
/* Table: RESTAURANTE                                           */
/*==============================================================*/
create table RESTAURANTE (
   ID_RESTAURANTE       SERIAL               not null,
   NOMBRE_RESTAURANTE   VARCHAR(60)          not null,
   UBI_RESTAURANTE      VARCHAR(100)         not null,
   GER_RESTAURANTE      VARCHAR(60)          not null,
   TELF_RESTAURANTE     VARCHAR(10)          not null,
   constraint PK_RESTAURANTE primary key (ID_RESTAURANTE)
);

/*==============================================================*/
/* Index: RESTAURANTE_PK                                        */
/*==============================================================*/
create unique index RESTAURANTE_PK on RESTAURANTE (
ID_RESTAURANTE
);

alter table ATENCION
   add constraint FK_ATENCION_RELATIONS_MESERO foreign key (ID_MESERO)
      references MESERO (ID_MESERO)
      on delete restrict on update restrict;

alter table ATENCION
   add constraint FK_ATENCION_RELATIONS_MESA foreign key (ID_MESA)
      references MESA (ID_MESA)
      on delete restrict on update restrict;

alter table CHEF
   add constraint FK_CHEF_RELATIONS_RESTAURA foreign key (ID_RESTAURANTE)
      references RESTAURANTE (ID_RESTAURANTE)
      on delete restrict on update restrict;

alter table DETALLE
   add constraint FK_DETALLE_RELATIONS_FACTURA foreign key (ID_FACTURA)
      references FACTURA (ID_FACTURA)
      on delete restrict on update restrict;

alter table DETALLE
   add constraint FK_DETALLE_RELATIONS_MENU foreign key (ID_MENU)
      references MENU (ID_MENU)
      on delete restrict on update restrict;

alter table FACTURA
   add constraint FK_FACTURA_RELATIONS_RESTAURA foreign key (ID_RESTAURANTE)
      references RESTAURANTE (ID_RESTAURANTE)
      on delete restrict on update restrict;

alter table FACTURA
   add constraint FK_FACTURA_RELATIONS_CLIENTE foreign key (ID_CLIENTE)
      references CLIENTE (ID_CLIENTE)
      on delete restrict on update restrict;

alter table MATERIAL
   add constraint FK_MATERIAL_RELATIONS_RESTAURA foreign key (ID_RESTAURANTE)
      references RESTAURANTE (ID_RESTAURANTE)
      on delete restrict on update restrict;

alter table MESA
   add constraint FK_MESA_RELATIONS_RESTAURA foreign key (ID_RESTAURANTE)
      references RESTAURANTE (ID_RESTAURANTE)
      on delete restrict on update restrict;

alter table MESERO
   add constraint FK_MESERO_RELATIONS_RESTAURA foreign key (ID_RESTAURANTE)
      references RESTAURANTE (ID_RESTAURANTE)
      on delete restrict on update restrict;

alter table RESERVACION
   add constraint FK_RESERVAC_RELATIONS_CLIENTE foreign key (ID_CLIENTE)
      references CLIENTE (ID_CLIENTE)
      on delete restrict on update restrict;

alter table RESERVACION
   add constraint FK_RESERVAC_RELATIONS_MESA foreign key (ID_MESA)
      references MESA (ID_MESA)
      on delete restrict on update restrict;

