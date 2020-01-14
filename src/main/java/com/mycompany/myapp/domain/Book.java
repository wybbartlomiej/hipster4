package com.mycompany.myapp.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

/**
 * A Book.
 */
@Entity
@Table(name = "book")
public class Book implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "writed_at")
    private LocalDate writedAt;

    @OneToMany(mappedBy = "book")
    private Set<Rent> rents = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties("books")
    private Author author;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public Book name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public LocalDate getWritedAt() {
        return writedAt;
    }

    public Book writedAt(LocalDate writedAt) {
        this.writedAt = writedAt;
        return this;
    }

    public void setWritedAt(LocalDate writedAt) {
        this.writedAt = writedAt;
    }

    public Set<Rent> getRents() {
        return rents;
    }

    public Book rents(Set<Rent> rents) {
        this.rents = rents;
        return this;
    }

    public Book addRent(Rent rent) {
        this.rents.add(rent);
        rent.setBook(this);
        return this;
    }

    public Book removeRent(Rent rent) {
        this.rents.remove(rent);
        rent.setBook(null);
        return this;
    }

    public void setRents(Set<Rent> rents) {
        this.rents = rents;
    }

    public Author getAuthor() {
        return author;
    }

    public Book author(Author author) {
        this.author = author;
        return this;
    }

    public void setAuthor(Author author) {
        this.author = author;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Book)) {
            return false;
        }
        return id != null && id.equals(((Book) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Book{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", writedAt='" + getWritedAt() + "'" +
            "}";
    }
}
