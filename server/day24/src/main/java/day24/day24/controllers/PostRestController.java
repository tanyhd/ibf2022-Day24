package day24.day24.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.HttpHeaders;
import java.util.Optional;

import day24.day24.models.Post;
import day24.day24.repositories.PostRepository;

@RestController
@RequestMapping(path = "/post")
public class PostRestController {
    
    @Autowired
    PostRepository postRepo;

    @GetMapping(path = "/{postId}/image")
    public ResponseEntity<byte[]> getPostImage (@PathVariable Integer postId) {
        
        Optional<Post> opt = postRepo.getPostById(postId);
        if (opt.isEmpty())
            return ResponseEntity.notFound().build();

        final Post post = opt.get();
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type",post.getImageType());
        headers.add("Cache-Control", "max-age=604800");
        return ResponseEntity.ok()
            //.header("Content-Type", post.getImageType())
            .headers(headers)
            .body(post.getImage());
    }
}
