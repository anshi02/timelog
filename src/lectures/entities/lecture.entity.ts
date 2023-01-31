import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import Faculty from '../../faculties/entities/faculty.entity';
import Room from '../../rooms/entities/room.entity';
import Schedule from '../../schedules/entities/schedule.entity';
import Subject from '../../subjects/entities/subject.entity';
import TimeSlot from '../../time-slots/entities/time-slot.entity';

@Entity('lectures')
export default class Lecture {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Schedule, (schedule) => schedule.lectures)
    @JoinColumn()
    schedule: Schedule;

    @ManyToOne(() => Room, (room) => room.lectures)
    @JoinColumn()
    room: Room;

    @ManyToOne(() => Subject, (subject) => subject.lectures)
    @JoinColumn()
    subject: Subject;

    @ManyToOne(() => Faculty, (faculty) => faculty.lectures)
    @JoinColumn()
    faculty: Faculty;

    @ManyToOne(() => TimeSlot, (timeSlot) => timeSlot.lectures)
    @JoinColumn()
    timeSlot: TimeSlot[];
}
