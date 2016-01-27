package com.agencja.rest;

import com.agencja.KlubDAO;
import com.agencja.domain.Klub;

import javax.ejb.EJB;
import javax.ejb.Stateless;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.List;

@Stateless
@Path("/klub")
public class KlubResource {

    @EJB
    private KlubDAO klubManager;

    @POST
    @Path("/addKlub")
    @Produces(MediaType.APPLICATION_JSON)
    public Response addKlub(@FormParam("miasto") String miasto,
                            @FormParam("nazwa") String nazwa,
                            @FormParam("ilosc_miejsc") int ilosc_miejsc) {
        Klub klub = new Klub();
        klub.setMiasto(miasto);
        klub.setNazwa(nazwa);
        klub.setIlosc_miejsc(ilosc_miejsc);
        klubManager.addKlub(klub);

        return Response.status(Response.Status.CREATED).entity("").build();
    }

    @GET
    @Path("/getAllKlubs")
    @Produces(MediaType.APPLICATION_JSON)
    public List<Klub> getAllProducts() {
        return klubManager.getAllKlubs();
    }
/*
    @GET
    @Path("/getKlub/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Klub getKlubByID(@PathParam("id") Long id) {
        return klubManager.getKlubByID(id);
    }
*/

    @PUT
    @Path("/updateKlub")
    @Produces(MediaType.APPLICATION_JSON)
    public Response updateKlub(@FormParam("idKlub") long idKlub,
                               @FormParam("miasto") String miasto,
                               @FormParam("nazwa") String nazwa,
                               @FormParam("ilosc_miejsc") int ilosc_miejsc) {
        Klub klub = new Klub();
        klub.setIdKlub(idKlub);
        klub.setMiasto(miasto);
        klub.setNazwa(nazwa);
        klub.setIlosc_miejsc(ilosc_miejsc);

        klubManager.updateKlub(klub);

        return Response.status(Response.Status.OK).entity("").build();
    }


    @DELETE
    @Path("/deleteKlub")
    @Produces(MediaType.APPLICATION_JSON)
    public Response deleteKlub(@FormParam("idKlub") long idKlub) {
        Klub klub = new Klub();
        klub.setIdKlub(idKlub);

        klubManager.deleteKlub(klub);

        return Response.status(Response.Status.OK).entity("").build();
    }
    }



