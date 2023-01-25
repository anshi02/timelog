import Room from 'src/rooms/entities/room.entity';
import Schedule from 'src/schedules/entities/schedule.entity';
import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import Subject from 'src/subjects/entities/subject.entity';
import Faculty from 'src/faculties/entities/faculty.entity';
import TimeSlot from 'src/time-slots/entities/time-slot.entity';

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
