import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Place {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    name: 'place_id',
  })
  id: number;

  @Column({
    nullable: false,
  })
  country: string;

  @Column({
    name: 'goal',
    nullable: false,
    default: '',
  })
  local: string;

  @Column({
    nullable: false,
    default: new Date(),
  })
  meta: Date;

  @Column({
    name: 'flag_url',
    nullable: false,
    default: '',
  })
  flagUrl: string;

  @Column({
    nullable: false,
    default: new Date(),
  })
  createDate: Date;

  @Column({
    nullable: false,
    default: new Date(),
  })
  updateDate: Date;
}
