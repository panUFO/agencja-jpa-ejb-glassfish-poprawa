package com.agencja.service;

import com.agencja.ZespolDAO;
import com.agencja.domain.Zespol;

import org.hibernate.Hibernate;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

@Stateless
public class ZespolManager implements ZespolDAO
{

    @PersistenceContext
    EntityManager em;


    public Zespol addZespol(Zespol zespol)
    {
        em.persist(zespol);
        em.flush();

        return zespol;
    }

    public List<Zespol> getAllZespols()
    {
        return em.createNamedQuery("zespol.getAll").getResultList();
    }

    public Zespol getZespolByID(long id)
    {
        return em.find(Zespol.class, id);
    }


    public void deleteZespol(Zespol zespol)
    {
        em.remove(em.getReference(Zespol.class, zespol.getIdZespol()));
    }

    public Zespol updateZespol(Zespol zespol)
    {
        return em.merge(zespol);
    }




}
