package com.pawmatch.backend.daos;

import com.pawmatch.backend.models.UserModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserDao extends JpaRepository<UserModel,Long> {

}
