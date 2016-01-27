package com.agencja;

import com.agencja.domain.Zespol;
import java.util.List;

public interface ZespolDAO {

    Zespol addZespol(Zespol zespol);
    List<Zespol> getAllZespols();
    Zespol getZespolByID(Long id);
    Zespol updateZespol(Zespol zespol);
    void deleteZespol(Zespol zespol);
}
