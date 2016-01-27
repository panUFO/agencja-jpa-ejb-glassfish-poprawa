package com.agencja.domain;
import javax.persistence.*;


@Entity
@Table(name = "Zespol")
@NamedQueries({
        @NamedQuery(name = "zespol.getAll", query = "Select z from Zespol z"),
        @NamedQuery(name = "zespol.getByID", query = "Select z from Zespol z where z.idZespol = :idZespol")
})

public class Zespol {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long idZespol;

    @Column(nullable = false)
    private String nazwa;

    @Column(nullable = false)
    private String kraj;

    public Zespol() {
    }

    public Zespol(String nazwa, String kraj) {
        this.nazwa = nazwa;
        this.kraj = kraj;
    }

    public long getIdZespol() {
        return idZespol;
    }

    public void setIdZespol(long idZespol) {
        this.idZespol = idZespol;
    }

    public String getNazwa() {
        return nazwa;
    }

    public void setNazwa(String nazwa) {
        this.nazwa = nazwa;
    }

    public String getKraj() {
        return kraj;
    }

    public void setKraj(String kraj) {
        this.kraj = kraj;
    }

}

