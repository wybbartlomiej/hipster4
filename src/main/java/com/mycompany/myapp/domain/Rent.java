package com.mycompany.myapp.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

import java.io.Serializable;
import java.time.LocalDate;

/**
 * A Rent.
 */
@Entity
@Table(name = "rent")
public class Rent implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "term")
    private LocalDate term;

    @ManyToOne
    @JsonIgnoreProperties("rents")
    private Customer customer;

    @ManyToOne
    @JsonIgnoreProperties("rents")
    private Book book;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getTerm() {
        return term;
    }

    public Rent term(LocalDate term) {
        this.term = term;
        return this;
    }

    public void setTerm(LocalDate term) {
        this.term = term;
    }

    public Customer getCustomer() {
        return customer;
    }

    public Rent customer(Customer customer) {
        this.customer = customer;
        return this;
    }

    public void setCustomer(Customer customer) {
        this.customer = customer;
    }

    public Book getBook() {
        return book;
    }

    public Rent book(Book book) {
        this.book = book;
        return this;
    }

    public void setBook(Book book) {
        this.book = book;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Rent)) {
            return false;
        }
        return id != null && id.equals(((Rent) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Rent{" +
            "id=" + getId() +
            ", term='" + getTerm() + "'" +
            "}";
    }
}
