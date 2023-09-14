create or replace procedure factura(int,int,int) 
as
$$
declare
	val_unit decimal(10,2);
	val_tot_det decimal(10,2);
	cant_menu int;
	subtotal decimal(10,2);
	begin	
			if($3>0)then
				select precio_venta_menu into val_unit from menu where id_menu=$2;
				select cantidad_vendida_menu into cant_menu from menu where id_menu=$2;
				select subtotal_factura into subtotal from factura where id_factura=$1;
				val_tot_det = $3*val_unit;
				insert into DETALLE (ID_FACTURA,ID_MENU,CANTIDAD_DETALLE,VALOR_UNITARIO_DETALLE,VALOR_TOTAL_DETALLE)
	values($1, $2, $3,val_unit,val_tot_det);
				update factura set subtotal_factura=subtotal+val_tot_det , iva_factura=(subtotal+val_tot_det)*0.12, total_factura= ((subtotal+val_tot_det)+((subtotal+val_tot_det)*0.12)) where id_factura=$1;
				update menu set cantidad_vendida_menu=cant_menu+$3 where id_menu=$2;
			else	
				raise exception 'La cantidad de la venta no puede ser menor que 1';
				rollback;
				
			end if;
	exception
		when sqlstate '23503' then
		raise exception 'Envio un Id incorrecto en Factura o Menu';
		rollback;
	commit;
end;
$$
language plpgsql;