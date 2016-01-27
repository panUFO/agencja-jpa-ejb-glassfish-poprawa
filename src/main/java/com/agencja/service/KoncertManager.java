package com.agencja.service;

import com.agencja.KlubDAO;
import com.agencja.KoncertDAO;
import com.agencja.domain.*;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

@Stateless
public class KoncertManager implements KoncertDAO {

    @PersistenceContext
    EntityManager em;

    public Koncert addKoncert(Koncert koncert)
    {
        em.persist(koncert);
        em.flush();

        return koncert;
    }

    public void deleteKoncert(Koncert koncert)
    {
        em.remove(em.getReference(Koncert.class, koncert.getIdKoncert()));
    }


    public Koncert updateKoncert(Koncert koncert)
    {
        return (Koncert)em.merge(koncert);
    }

    public List<Koncert> getAllKoncerts()
    {
        return em.createNamedQuery("koncert.getAll").getResultList();
    }

    public Koncert getKoncertByID(Koncert koncert)
    {
        return em.find(Koncert.class, koncert.getIdKoncert());
    }

    public List<Koncert> getKoncertByKlubID(Klub klub)
    {
        return em.createNamedQuery("klub.getByIdKlub").setParameter("idKlub", klub.getIdKlub()).getResultList();
    }

}
