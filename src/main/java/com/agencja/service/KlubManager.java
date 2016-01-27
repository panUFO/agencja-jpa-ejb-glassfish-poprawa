package com.agencja.service;

import com.agencja.KlubDAO;
import com.agencja.domain.Klub;


import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

@Stateless
public class KlubManager implements KlubDAO {

    @PersistenceContext
    EntityManager em;

    public Klub addKlub(Klub klub) {
        em.persist(klub);
        em.flush();
        return klub;
    }

    public void deleteKlub(Klub klub) {
        em.remove(em.getReference(Klub.class, klub.getIdKlub()));
    }

    public Klub updateKlub(Klub klub) {
        return (Klub) em.merge(klub);
    }


    public List<Klub> getAllKlubs() {
        return em.createNamedQuery("klub.getAll").getResultList();
    }

    public Klub getKlubByID(Klub klub) {
        return em.find(Klub.class, klub.getIdKlub());
    }


}
