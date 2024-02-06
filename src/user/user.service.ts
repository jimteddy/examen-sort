import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { log } from 'console';
import { Compte } from 'src/compte/entities/compte.entity';
import { Post } from 'src/posts/entities/post.entity';
import { CreatePostDto } from 'src/posts/dto/create-post.dto';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Compte) private compteRepository: Repository<Compte>,
    @InjectRepository(Post) private postRepository: Repository<Post>,
  ){}

  create(createUserDto: CreateUserDto) {
    log(createUserDto)
    const newUser = this.userRepository.create({ 
      ...createUserDto, 
      createAt: new Date()  
    });
    log(newUser)
    return this.userRepository.save(newUser)
  }

  findAll(): Promise<User[]>{
    return this.userRepository.find({relations: ['compte', 'posts']});
  }

  findOne(id: number): Promise<User | null> {
    return this.userRepository.findOneBy({id});
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    await this.userRepository.update({id}, {...updateUserDto})
  }

  async remove(id: number): Promise<void> {
    this.userRepository.delete(id);
  }

  async createCompte(createCompteDto: CreateUserDto){
    const newCompte = this.compteRepository.create({...createCompteDto});
    return this.compteRepository.save(newCompte)
  }

  async createUserCompte(id: number, createCompteDto: CreateUserDto){
    log(createCompteDto)
    const user = await this.userRepository.findOneBy({id})
    if (!user) throw new HttpException('Utilisateur non trouvé', HttpStatus.BAD_REQUEST);
    if (user.compte) throw new HttpException('Utilisateur a déja un trouvé', HttpStatus.BAD_REQUEST);
    return user.compte;  
    //const newCompte = this.compteRepository.create({...createCompteDto, solde: 0});
    //const compte = await this.compteRepository.save(newCompte);
    //log(compte)
    //user.compte = compte;
    //return this.userRepository.save(user)
  }

  async createUserPost(id: number, createPostDto: CreatePostDto){
    const user = await this.userRepository.findOneBy({id})
    if (!user) throw new HttpException('Utilisateur non trouvé', HttpStatus.BAD_REQUEST);
    const newPost = this.postRepository.create({...createPostDto, user});
    return this.postRepository.save(newPost);
  }
}
