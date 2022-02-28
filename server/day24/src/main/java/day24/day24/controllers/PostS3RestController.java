package day24.day24.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import day24.day24.models.Post;
import day24.day24.repositories.PostRepository;
import java.io.IOException;
import org.springframework.beans.factory.annotation.Autowired;

@RestController
@RequestMapping(path="/post/s3")
public class PostS3RestController {

    @Autowired
    PostRepository postRepo;
    
    @PostMapping()
    public ResponseEntity<String> post(@RequestParam(name="image") MultipartFile image,
                                    @RequestPart String comment, @RequestPart String poster) throws IOException {

        byte[] buff = new byte[0];

        buff = image.getBytes();

        Post post = new Post();
        post.setComment(comment);
        post.setPoster(poster);
        post.setImageType("image/jpeg");
        post.setImage(buff);
        postRepo.insertPost(post);
        return ResponseEntity.ok("{}");
    }
}
