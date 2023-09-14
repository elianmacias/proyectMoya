create or replace procedure reservacion(int,int,date,int) 
as
$$
declare
	estado varchar;
	begin
			select estado_mesa into estado from mesa where id_mesa=$2;
			if(estado='Libre')then
				insert into reservacion(id_cliente,id_mesa,estado_reservacion,fecha_reservacion,costo_reservacion)values($1,$2,'Pendiente',$3,$4);	
				update mesa set estado_mesa='Reservado' where id_mesa=$2; 				
			else
				raise exception 'La mesa ya esta reservada intente seleccionar otra mesa diferente';
				rollback;
			end if;	
	exception
		when sqlstate '23503' then
		raise exception 'Envio un Id incorrecto en Cliente o Mesa';
		rollback;
	commit;
end;
$$
language plpgsql;