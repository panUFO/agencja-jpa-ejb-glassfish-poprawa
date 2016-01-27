package com.agencja;

import com.agencja.domain.Klub;

import java.util.List;

public interface KlubDAO {

    Klub addKlub(Klub klub);
    List<Klub> getAllKlubs();
    Klub getKlubByID(Klub klub);
    Klub updateKlub(Klub klub);
    void deleteKlub(Klub klub);

}
