import {Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryColumn, PrimaryGeneratedColumn} from "typeorm";

@Entity('raquettes')
export class Raquettes {
    @PrimaryGeneratedColumn()
    id: number
    @Column({ nullable: true })
    user_id?:number;
    @Column({ nullable: true })
    p_x?:number;
    @Column({ nullable: true })
    p_y?:number;
    @Column({ nullable: true })
    t_y?:number;
    @Column({ nullable: true })
    connect?:boolean;
}

@Entity('balls')
export class Balls {
    @PrimaryGeneratedColumn()
    id: number
    @Column({ nullable: true })
    p_x?:number;
    @Column({ nullable: true })
    p_y?:number;
    @Column({ nullable: true })
    m_x?:number;
    @Column({ nullable: true })
    m_y?:number;
	@Column({ nullable: true })
    connect?:boolean;
}

@Entity('historique')
export class Historique {
    @PrimaryGeneratedColumn()
    id: number
	@Column({ nullable: true })
	coter_winner: number;
	@Column({ nullable: true })
	winner_id: number;
    @Column({ nullable: true })
	winner_name: string;
	@Column({ nullable: true })
	looser_id: number;
    @Column({ nullable: true })
	looser_name: string;
	@Column({ nullable: true })
  	winner_point: number;
	@Column({ nullable: true })
  	looser_point: number;
	@Column({ nullable: true })
	dificult: number;  
}

@Entity('games')
export class Games {
    @PrimaryGeneratedColumn()
    id: number
    @Column({ nullable: true })
    ball_id:number ;
    @Column({ nullable: true })
    canvasX:number;
    @Column({ nullable: true })
    canvasY:number ;
    @Column({ nullable: true })
    blocksize:number ;
    @Column({ nullable: true })
    raq1: number ;
    @Column({ nullable: true })
    raq2: number ;
	@Column({ nullable: true })
    point1: number ;
	@Column({ nullable: true })
    point2: number ;
    @Column({ nullable: true })
    dificult:number ;
    @Column({ nullable: true })
    winner: number;
	@Column({ nullable: true })
    private: boolean;
    @Column({ nullable: true })
    invite: number;
    @Column({ nullable: true })
    timeStart: Date;
    @Column({ nullable: true })
    idSocket1: string;
    @Column({ nullable: true })
    idSocket2: string;
}