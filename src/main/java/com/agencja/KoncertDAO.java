package com.agencja;

import com.agencja.domain.Klub;
import com.agencja.domain.Koncert;

import java.util.List;

public interface KoncertDAO {

    Koncert addKoncert(Koncert koncert);
    List<Koncert> getAllKoncerts();
    Koncert getKoncertByID(Koncert koncert);
    Koncert updateKoncert(Koncert koncert);
    void deleteKoncert(Koncert koncert);

}
